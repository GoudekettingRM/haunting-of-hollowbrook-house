import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className='pt-4 text-parchment'>
      <h2 className='text-4xl mb-6 px-4 sm:pl-0'>Contact Us</h2>

      <div className='space-y-6 max-w-screen-lg'>
        {/* Introduction */}
        <div className='bg-white bg-opacity-10 p-6'>
          <p className='text-lg mb-4'>
            Welcome to the Whispering Hollows Historical Society. We&apos;re dedicated to preserving and sharing our
            community&apos;s rich history.
          </p>
        </div>

        {/* Hours and Location Grid */}
        <div className='grid md:grid-cols-2 gap-6'>
          {/* Visiting Hours */}
          <div className='bg-white bg-opacity-10 p-6 space-y-4'>
            <div className='flex items-center gap-2 mb-4'>
              <Clock className='h-5 w-5' />
              <h3 className='text-xl'>Visiting Hours</h3>
            </div>

            <div className='space-y-2 font-serif'>
              <div className='flex justify-between'>
                <span>Monday - Friday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className='flex justify-between'>
                <span>Saturday</span>
                <span>11:00 AM - 3:00 PM</span>
              </div>
              <div className='flex justify-between'>
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>

            <p className='text-sm italic'>
              Last admission 30 minutes before closing. Special arrangements available for researchers and group visits.
            </p>
          </div>

          {/* Contact Information */}
          <div className='bg-white bg-opacity-10 p-6 space-y-4'>
            <div className='flex items-center gap-2 mb-4'>
              <MapPin className='h-5 w-5' />
              <h3 className='text-xl'>Find Us</h3>
            </div>

            <div className='space-y-4 font-serif'>
              <div className='flex items-start gap-2'>
                <MapPin className='h-5 w-5 mt-1' />
                <p>
                  472 Heritage Lane
                  <br />
                  Whispering Hollows
                  <br />
                  WH 12345
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='h-5 w-5' />
                <p>(555) 123-4567</p>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='h-5 w-5' />
                <p>info@whisperinghollowshistory.org</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className='bg-white bg-opacity-10 p-6 space-y-4'>
          <h3 className='text-xl mb-4'>Important Information</h3>

          <div className='space-y-4 font-serif'>
            <p>
              <span className='font-bold'>Research Appointments:</span> Our archives are available to researchers by
              appointment. Please contact us at least 48 hours in advance to schedule a visit.
            </p>
            <p>
              <span className='font-bold'>Group Tours:</span> We offer guided tours for groups of 5 or more. Tours must
              be booked at least one week in advance.
            </p>
            <p>
              <span className='font-bold'>Holiday Closures:</span> The Historical Society is closed on all major
              holidays and between December 24th and January 2nd.
            </p>
            <p className='text-sm italic mt-4'>
              Please note that some exhibits, including Hollowbrook House, may have different operating hours. Contact
              us for specific information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
