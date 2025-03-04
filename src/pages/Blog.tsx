
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary-400 to-accent bg-clip-text text-transparent">Our Blog</h1>
          
          <p className="text-xl text-gray-300 mb-12">
            Tips, insights, and updates from our team of web experts to help you succeed online.
          </p>
          
          <div className="space-y-10">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="aspect-video bg-gray-700 md:aspect-auto md:h-full"></div>
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    
                    <Link to="#" className="text-primary hover:text-primary/80 font-medium">
                      Read More →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <nav className="inline-flex">
              <Link to="#" className="px-4 py-2 border border-r-0 border-gray-700 rounded-l-md bg-gray-800/50 text-gray-300">
                Previous
              </Link>
              <Link to="#" className="px-4 py-2 border border-gray-700 bg-primary text-white">
                1
              </Link>
              <Link to="#" className="px-4 py-2 border border-l-0 border-gray-700 bg-gray-800/50 text-gray-300">
                2
              </Link>
              <Link to="#" className="px-4 py-2 border border-l-0 border-gray-700 bg-gray-800/50 text-gray-300">
                3
              </Link>
              <Link to="#" className="px-4 py-2 border border-l-0 border-gray-700 rounded-r-md bg-gray-800/50 text-gray-300">
                Next
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const blogPosts = [
  {
    title: "5 Essential Elements Every Business Website Needs",
    excerpt: "Discover the key components that every effective business website should include to attract and convert visitors. From clear navigation to compelling calls-to-action, we cover the essentials.",
    date: "July 12, 2023",
    author: "Sarah Johnson",
    image: "blog-1.jpg"
  },
  {
    title: "How to Choose the Right Website Template for Your Industry",
    excerpt: "Selecting the perfect website template can be overwhelming. Learn how to evaluate templates based on your industry needs, branding requirements, and functional priorities.",
    date: "June 28, 2023",
    author: "Michael Chen",
    image: "blog-2.jpg"
  },
  {
    title: "The Impact of Page Speed on Your Website's Success",
    excerpt: "Site speed affects everything from user experience to search engine rankings. Find out how to measure your website's performance and implement practical optimizations.",
    date: "June 15, 2023",
    author: "Jessica Williams",
    image: "blog-3.jpg"
  },
  {
    title: "Content Strategy 101: Creating Effective Website Copy",
    excerpt: "Great design needs great content. Learn how to craft compelling website copy that engages visitors, communicates your value proposition, and drives conversions.",
    date: "May 30, 2023",
    author: "David Rodriguez",
    image: "blog-4.jpg"
  }
];

export default Blog;
