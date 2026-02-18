import React from 'react';
import { Layout } from '../components/ui/Layout';
import { Button, Input, Textarea } from '../components/ui/FormControls';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Cards';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
export function Contact() {
  return <Layout>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-[#888888] text-lg">
              Have questions or feedback? We'd love to hear from you. Fill out
              the form or reach out directly.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#111111] rounded-lg flex items-center justify-center border border-[#222222] shrink-0">
                <Mail className="w-5 h-5 text-[#f97316]" />
              </div>
              <div>
                <h3 className="font-bold text-white">Support</h3>
                <p className="text-[#888888]">support@unifreelancer.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#111111] rounded-lg flex items-center justify-center border border-[#222222] shrink-0">
                <MessageSquare className="w-5 h-5 text-[#f97316]" />
              </div>
              <div>
                <h3 className="font-bold text-white">Business Inquiries</h3>
                <p className="text-[#888888]">business@unifreelancer.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#111111] rounded-lg flex items-center justify-center border border-[#222222] shrink-0">
                <MapPin className="w-5 h-5 text-[#f97316]" />
              </div>
              <div>
                <h3 className="font-bold text-white">Office</h3>
                <p className="text-[#888888]">Colombo 03, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Name" placeholder="Your name" />
                <Input label="Email" type="email" placeholder="your@email.com" />
              </div>
              <Input label="Subject" placeholder="How can we help?" />
              <Textarea label="Message" placeholder="Tell us more..." className="min-h-[150px]" />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>;
}