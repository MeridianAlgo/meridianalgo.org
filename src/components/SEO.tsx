import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'MeridianAlgo - Democratizing Financial Literacy',
  description = 'MeridianAlgo is an Illinois-based 501(c)(3) nonprofit research organization dedicated to closing the wealth gap through accessible financial education, easy-to-use investing tools, and community-focused research.',
  keywords = "MeridianAlgo, Midwest financial literacy, nonprofit organization, 501c3 nonprofit, Illinois nonprofit, financial education, wealth gap solutions, investing education, community research, economic empowerment, financial inclusion, financial technology, fintech nonprofit, financial wellness, wealth building, financial democratization, community education, accessible finance, inclusive finance, social impact, educational resources, budgeting workshops",
  image = '/Profile Logo (1).png',
  url = 'https://meridianalgo.com'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const metaTags = {
      'description': description,
      'keywords': keywords,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    };

    Object.entries(metaTags).forEach(([property, content]) => {
      let element = document.querySelector(`meta[property="${property}"]`) || 
                    document.querySelector(`meta[name="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MeridianAlgo",
      "url": url,
      "logo": image,
      "description": description,
      "sameAs": [
        "https://github.com/MeridianAlgo",
        "https://linkedin.com/company/meridianalgo",
        "https://x.com/meridianalgo"
      ]
    };

    let scriptElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url]);

  return null;
};

export default SEO;
