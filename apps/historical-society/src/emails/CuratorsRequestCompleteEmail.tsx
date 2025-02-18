import { Body, Head, Html, Preview, Section, Text } from '@react-email/components';

const CuratorsRequestCompleteEmail = ({ name }: { name: string }) => {
  return (
    <Html lang='en'>
      <Head />
      <Preview>Technical issues resolved. Thank you!</Preview>
      <Body style={main}>
        <Section style={section}>
          <Text style={text}>Dear {name},</Text>
          <Text style={text}>
            Thank you for taking the time to look into our website issues. I honestly don&apos;t know exactly what you
            did, but it worked beautifully - everything seems to be working normally now. The content has stabilized,
            our digital archives are behaving as expected, and all the content we post seems to end up on the website as
            it should.
          </Text>
          <Text style={text}>
            Robin, our regular website maintainer, is quite impressed too. I'm sure he will get in touch with you. He
            had been trying to track down the root cause of these issues for weeks without success. Whatever changes you
            made seem to have resolved everything. I realize these may have been unusual technical issues, and I
            appreciate you taking them seriously and responding so quickly. The Historical Society&apos;s website is
            crucial for our work, and having it functioning properly again is a huge relief.
          </Text>

          <Text style={text}>
            If we encounter any other technical problems in the future, I&apos;ll be sure to reach out. Thank you again
            for your expertise.
          </Text>

          <Text style={text}>
            Best regards,
            <br />
            James Chen
          </Text>
        </Section>

        <Text style={footer}>
          Head Curator
          <br />
          Whispering Hollows Historical Society
          <br />
          www.whhs.info
          <br />
          <br />
          Paranormal Investigation & Research
          <br />
          www.betweenapparitions.net
        </Text>
      </Body>
    </Html>
  );
};
export default CuratorsRequestCompleteEmail;

const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const section = {
  padding: '24px 0',
  textAlign: 'left' as const,
};

const text = {
  margin: '0 0 16px 0',
  textAlign: 'left' as const,
};

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'left' as const,
  lineHeight: 1.5,
  margin: 0,
};
