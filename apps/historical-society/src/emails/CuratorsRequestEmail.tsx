import { Body, Head, Html, Link, Preview, Section, Text } from '@react-email/components';

const CuratorsRequestEmail = ({ name, email }: { name: string; email: string }) => {
  return (
    <Html lang='en'>
      <Head />
      <Preview>Thank you for reaching out and offering your assistance with our technical issues.</Preview>
      <Body style={main}>
        <Section style={section}>
          <Text style={text}>Dear {name},</Text>
          <Text style={text}>
            Thank you for reaching out and offering your assistance with our technical issues. We&apos;ve been
            experiencing some very unusual problems with the Historical Society&apos;s website (
            <Link href={`www.whhs.info?n=${name}&e=${email}`}>www.whhs.info</Link>) over the past week.
          </Text>
          <Text style={text}>
            Initially, we thought it was just typical website glitches, but things have escalated. Content seems to be
            rearranging itself, and some of our digital archives are behaving erratically - documents appearing and
            disappearing, that sort of thing. Most concerning are the reports from visitors who claim they&apos;re
            seeing different content than what we&apos;ve actually posted.
          </Text>

          <Text style={text}>
            I&apos;ve already consulted with our regular website maintainer (Robin Goudeketting), but they can&apos;t
            find anything wrong with the code or hosting setup. Given your background, I was hoping you might be able to
            take a look and see if you can spot anything unusual in the system.
          </Text>

          <Text style={text}>I appreciate any insights you can provide.</Text>
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
          <Link href={`www.whhs.info?n=${name}&e=${email}`}>www.whhs.info</Link>
          <br />
          <br />
          Paranormal Investigation & Research
          <br />
          <Link href='www.betweenapparitions.net'>www.betweenapparitions.net</Link>
        </Text>
      </Body>
    </Html>
  );
};
export default CuratorsRequestEmail;

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
