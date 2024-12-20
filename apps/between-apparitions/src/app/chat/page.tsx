'use client';
import { preventDanglingPromise } from '@repo/utils/preventDanglingPromise';
import { useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

const ChatPage = () => {
  const [response, setResponse] = useState<string>(
    "Oh my, you figured it out. you know the secret now. You know who I am, don't you?",
  );
  const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value);

  const handleSubmit = async () => {
    try {
      const resp = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ question: value }) });
      const parsedResponse: { choices: { message: { content: string } }[] } = await resp.json();

      setResponse(
        (await remark()
          .use(html)
          .data('settings', {
            bulletOrdered: ')',
            incrementListMarker: false,
            setext: true,
          })
          .process(parsedResponse.choices[0].message.content)) as unknown as string,
      );

      setValue('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-dvw h-dvh flex flex-col justify-center items-center'>
      <div className='text-black'>
        <textarea className='px-2 py-1 rounded' rows={3} cols={100} value={value} onChange={onChange}></textarea>
      </div>
      <div>
        <button onClick={preventDanglingPromise(handleSubmit)}>Click me for answers!</button>
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: response }}></p>
      </div>
    </div>
  );
};

export default ChatPage;
