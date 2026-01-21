import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-7234a240/health", (c) => {
  return c.json({ status: "ok" });
});

// Create Supabase client helper
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
};

// Auth helper - validates user and returns user ID
const authenticateUser = async (request: Request) => {
  const supabase = getSupabaseClient();
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  
  if (!accessToken) {
    return { error: 'No access token provided', user: null };
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user) {
    return { error: 'Unauthorized', user: null };
  }

  return { user, error: null };
};

// Sign up endpoint
app.post("/make-server-7234a240/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields: email, password, name' }, 400);
    }

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Error during sign up: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user, message: 'User created successfully' });
  } catch (error) {
    console.log(`Error in signup endpoint: ${error}`);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Get user's restaurants
app.get("/make-server-7234a240/restaurants", async (c) => {
  try {
    const { user, error: authError } = await authenticateUser(c.req.raw);
    
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const supabase = getSupabaseClient();

    // Get restaurants that the user has access to via restaurant_members table
    const { data: members, error: memberError } = await supabase
      .from('restaurant_members')
      .select('restaurant_id, role')
      .eq('user_id', user.id);

    if (memberError) {
      console.log(`Error fetching restaurant members: ${memberError.message}`);
      return c.json({ error: 'Failed to fetch restaurant access' }, 500);
    }

    if (!members || members.length === 0) {
      return c.json({ restaurants: [] });
    }

    // Get restaurant details
    const restaurantIds = members.map(m => m.restaurant_id);
    const { data: restaurants, error: restaurantsError } = await supabase
      .from('restaurants')
      .select('*')
      .in('id', restaurantIds);

    if (restaurantsError) {
      console.log(`Error fetching restaurants: ${restaurantsError.message}`);
      return c.json({ error: 'Failed to fetch restaurants' }, 500);
    }

    // Merge role information with restaurant data
    const restaurantsWithRole = restaurants.map(restaurant => {
      const member = members.find(m => m.restaurant_id === restaurant.id);
      return { ...restaurant, role: member?.role };
    });

    return c.json({ restaurants: restaurantsWithRole });
  } catch (error) {
    console.log(`Error in restaurants endpoint: ${error}`);
    return c.json({ error: 'Internal server error fetching restaurants' }, 500);
  }
});

// Get analytics for a restaurant
app.get("/make-server-7234a240/analytics/:restaurantId", async (c) => {
  try {
    const { user, error: authError } = await authenticateUser(c.req.raw);
    
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const restaurantId = c.req.param('restaurantId');
    const supabase = getSupabaseClient();

    // Verify user has access to this restaurant
    const { data: member, error: memberError } = await supabase
      .from('restaurant_members')
      .select('*')
      .eq('user_id', user.id)
      .eq('restaurant_id', restaurantId)
      .single();

    if (memberError || !member) {
      return c.json({ error: 'Access denied to this restaurant' }, 403);
    }

    // Get call statistics
    const { data: calls, error: callsError } = await supabase
      .from('calls')
      .select('*')
      .eq('restaurant_id', restaurantId);

    if (callsError) {
      console.log(`Error fetching calls for analytics: ${callsError.message}`);
      return c.json({ error: 'Failed to fetch analytics data' }, 500);
    }

    // Calculate analytics
    const totalCalls = calls.length;
    const aiHandled = calls.filter(call => call.status === 'ai_handled').length;
    const transferred = calls.filter(call => call.status === 'transferred').length;
    const missed = calls.filter(call => call.status === 'missed').length;
    const afterHours = calls.filter(call => call.is_after_hours).length;

    const avgDuration = calls.length > 0 
      ? calls.reduce((sum, call) => sum + (call.duration || 0), 0) / calls.length 
      : 0;

    const aiPercentage = totalCalls > 0 ? (aiHandled / totalCalls) * 100 : 0;

    // Get add-on status from restaurant
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('call_recording_enabled, call_transcripts_enabled')
      .eq('id', restaurantId)
      .single();

    return c.json({
      analytics: {
        totalCalls,
        aiHandled,
        transferred,
        missed,
        afterHours,
        avgDuration,
        aiPercentage,
        callRecordingEnabled: restaurant?.call_recording_enabled || false,
        callTranscriptsEnabled: restaurant?.call_transcripts_enabled || false,
      }
    });
  } catch (error) {
    console.log(`Error in analytics endpoint: ${error}`);
    return c.json({ error: 'Internal server error fetching analytics' }, 500);
  }
});

// Get calls for a restaurant
app.get("/make-server-7234a240/calls/:restaurantId", async (c) => {
  try {
    const { user, error: authError } = await authenticateUser(c.req.raw);
    
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const restaurantId = c.req.param('restaurantId');
    const supabase = getSupabaseClient();

    // Verify access
    const { data: member, error: memberError } = await supabase
      .from('restaurant_members')
      .select('*')
      .eq('user_id', user.id)
      .eq('restaurant_id', restaurantId)
      .single();

    if (memberError || !member) {
      return c.json({ error: 'Access denied to this restaurant' }, 403);
    }

    // Get calls with pagination
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = (page - 1) * limit;

    const { data: calls, error: callsError, count } = await supabase
      .from('calls')
      .select('*', { count: 'exact' })
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (callsError) {
      console.log(`Error fetching calls: ${callsError.message}`);
      return c.json({ error: 'Failed to fetch calls' }, 500);
    }

    return c.json({ calls, total: count, page, limit });
  } catch (error) {
    console.log(`Error in calls endpoint: ${error}`);
    return c.json({ error: 'Internal server error fetching calls' }, 500);
  }
});

// Get call detail with transcript
app.get("/make-server-7234a240/calls/:restaurantId/:callId", async (c) => {
  try {
    const { user, error: authError } = await authenticateUser(c.req.raw);
    
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const restaurantId = c.req.param('restaurantId');
    const callId = c.req.param('callId');
    const supabase = getSupabaseClient();

    // Verify access
    const { data: member, error: memberError } = await supabase
      .from('restaurant_members')
      .select('*')
      .eq('user_id', user.id)
      .eq('restaurant_id', restaurantId)
      .single();

    if (memberError || !member) {
      return c.json({ error: 'Access denied to this restaurant' }, 403);
    }

    // Get call details
    const { data: call, error: callError } = await supabase
      .from('calls')
      .select('*')
      .eq('id', callId)
      .eq('restaurant_id', restaurantId)
      .single();

    if (callError || !call) {
      console.log(`Error fetching call detail: ${callError?.message}`);
      return c.json({ error: 'Call not found' }, 404);
    }

    // Get transcript if enabled
    let transcript = null;
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('call_transcripts_enabled')
      .eq('id', restaurantId)
      .single();

    if (restaurant?.call_transcripts_enabled) {
      const { data: transcriptData } = await supabase
        .from('call_transcripts')
        .select('*')
        .eq('call_id', callId)
        .single();
      
      transcript = transcriptData;
    }

    // Get AI summary
    const { data: summary } = await supabase
      .from('ai_summaries')
      .select('*')
      .eq('call_id', callId)
      .single();

    return c.json({ 
      call, 
      transcript,
      summary: summary?.summary || null,
      transcriptsEnabled: restaurant?.call_transcripts_enabled || false,
    });
  } catch (error) {
    console.log(`Error in call detail endpoint: ${error}`);
    return c.json({ error: 'Internal server error fetching call detail' }, 500);
  }
});

// Get signed URL for call recording
app.get("/make-server-7234a240/recording/:restaurantId/:callId", async (c) => {
  try {
    const { user, error: authError } = await authenticateUser(c.req.raw);
    
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401);
    }

    const restaurantId = c.req.param('restaurantId');
    const callId = c.req.param('callId');
    const supabase = getSupabaseClient();

    // Verify access
    const { data: member, error: memberError } = await supabase
      .from('restaurant_members')
      .select('*')
      .eq('user_id', user.id)
      .eq('restaurant_id', restaurantId)
      .single();

    if (memberError || !member) {
      return c.json({ error: 'Access denied to this restaurant' }, 403);
    }

    // Check if recording is enabled
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('call_recording_enabled')
      .eq('id', restaurantId)
      .single();

    if (!restaurant?.call_recording_enabled) {
      return c.json({ error: 'Call recording is not enabled for this restaurant' }, 403);
    }

    // Get call recording path
    const { data: recording } = await supabase
      .from('call_recordings')
      .select('storage_path')
      .eq('call_id', callId)
      .single();

    if (!recording || !recording.storage_path) {
      return c.json({ error: 'Recording not found' }, 404);
    }

    // Create signed URL for private bucket
    const { data: signedUrl, error: urlError } = await supabase
      .storage
      .from('make-7234a240-call-recordings')
      .createSignedUrl(recording.storage_path, 3600); // 1 hour expiry

    if (urlError || !signedUrl) {
      console.log(`Error creating signed URL: ${urlError?.message}`);
      return c.json({ error: 'Failed to generate recording URL' }, 500);
    }

    return c.json({ url: signedUrl.signedUrl });
  } catch (error) {
    console.log(`Error in recording endpoint: ${error}`);
    return c.json({ error: 'Internal server error fetching recording' }, 500);
  }
});

// Initialize storage bucket on startup
const initializeStorage = async () => {
  try {
    const supabase = getSupabaseClient();
    const bucketName = 'make-7234a240-call-recordings';
    
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
      console.log(`Created private storage bucket: ${bucketName}`);
    }
  } catch (error) {
    console.log(`Error initializing storage: ${error}`);
  }
};

// Initialize storage on startup
initializeStorage();

Deno.serve(app.fetch);
