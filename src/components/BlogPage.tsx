import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { usePageMetadata } from '../hooks/usePageMetadata';
import blogContent from '../content/blog.json';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const posts = blogContent.posts;
  const featuredPosts = posts.filter(post => post.featured);
  const allPosts = posts;

  usePageMetadata({
    title: 'DineTalk Blog | Perth Restaurant Technology & AI Insights',
    description:
      'Expert insights on restaurant technology, AI receptionists, and hospitality automation for Perth and WA venues. Tips, trends, and success stories.',
    keywords: [
      'restaurant technology blog',
      'Perth hospitality insights',
      'AI receptionist tips',
      'restaurant automation Perth',
      'WA hospitality technology',
    ],
    robots: 'index, follow',
    canonicalUrl: 'https://dinetalk.com.au/blog',
    author: 'DineTalk Australia',
    openGraph: {
      title: 'DineTalk Blog | Perth Restaurant Technology Insights',
      description:
        'Expert advice on restaurant automation, AI technology, and hospitality trends for Perth and Western Australian venues.',
      image: 'https://dinetalk.com.au/assets/og-image-blog.jpg',
      url: 'https://dinetalk.com.au/blog',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'DineTalk Blog | Restaurant Technology for Perth',
      description:
        'Latest insights on AI receptionists, automation, and technology trends for Perth restaurants.',
      image: 'https://dinetalk.com.au/assets/og-image-blog.jpg',
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePostClick = (slug: string) => {
    // For now, navigate to the blog post page (we'll create this next)
    onNavigate(`blogPost-${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Hero Section */}
      <section className="py-16 md:py-24" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              DineTalk Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights on restaurant technology, AI automation, and hospitality trends for Perth and Western Australian venues
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-background" data-reveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handlePostClick(post.slug)}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="group">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handlePostClick(post.slug)}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="text-primary text-sm font-medium hover:underline">
                    Read More →
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Transform Your Perth Restaurant?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Discover how DineTalk's AI receptionist can help your venue never miss another call or booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate('demo')}
              className="text-lg px-8"
            >
              Book Free Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('perthLanding')}
              className="text-lg px-8 bg-white/10 hover:bg-white/20 border-white/30 text-white"
            >
              Learn More About Perth AI
            </Button>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-8 bg-secondary" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">Explore more:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
                className="text-primary hover:underline"
              >
                Home
              </a>
              <span>•</span>
              <a
                href="/perth-ai-receptionist"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('perthLanding');
                }}
                className="text-primary hover:underline"
              >
                Perth AI Receptionist
              </a>
              <span>•</span>
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="text-primary hover:underline"
              >
                About
              </a>
              <span>•</span>
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('faq');
                }}
                className="text-primary hover:underline"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
