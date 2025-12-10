import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { usePageMetadata } from '../hooks/usePageMetadata';
import blogContent from '../content/blog.json';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (page: string) => void;
}

export function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
  const post = blogContent.posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl mb-6">Post Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Button onClick={() => onNavigate('blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  usePageMetadata({
    title: `${post.title} | DineTalk Blog`,
    description: post.excerpt,
    keywords: post.tags,
    robots: 'index, follow',
    canonicalUrl: `https://dinetalk.com.au/blog/${post.slug}`,
    author: post.author,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      image: 'https://dinetalk.com.au/assets/og-image-blog.jpg',
      url: `https://dinetalk.com.au/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      image: 'https://dinetalk.com.au/assets/og-image-blog.jpg',
    },
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishDate,
        author: {
          '@type': 'Organization',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'DineTalk',
          logo: {
            '@type': 'ImageObject',
            url: 'https://dinetalk.com.au/assets/logo.png',
          },
        },
        keywords: post.tags.join(', '),
      },
    ],
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Convert markdown-style content to paragraphs and headings
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-2xl md:text-3xl font-semibold mb-4 mt-8">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="text-xl md:text-2xl font-semibold mb-3 mt-6">
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        // Start of a list
        const listItems = [line];
        while (i + 1 < lines.length && lines[i + 1].startsWith('- ')) {
          i++;
          listItems.push(lines[i]);
        }
        elements.push(
          <ul key={key++} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground ml-4">
            {listItems.map((item, idx) => (
              <li key={idx}>{item.substring(2)}</li>
            ))}
          </ul>
        );
      } else if (line.trim() === '') {
        // Skip empty lines
      } else {
        elements.push(
          <p key={key++} className="text-muted-foreground mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate('blog')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>

      {/* Article */}
      <article className="py-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{post.category}</span>
              </div>
              <span>By {post.author}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {renderContent(post.content)}
            </div>

            {/* CTA at bottom */}
            <div className="mt-12 pt-8 border-t">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Ready to Transform Your Perth Restaurant?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Discover how DineTalk's AI receptionist can help your venue never miss another call.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => onNavigate('demo')}
                  >
                    Book Free Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => onNavigate('perthLanding')}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">More Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogContent.posts
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => onNavigate(`blogPost-${relatedPost.slug}`)}
                  >
                    <h4 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
