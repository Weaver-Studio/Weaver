import { customFetch } from "@studio/api/useFetch";
import SidebarLayout from "@studio/components/sidebar/sidebar-layout";
import { useSession } from "@weaver/shared/lib/auth-client";
import { Button } from "@weaver/ui/components/ui/button";
import { useState } from "react";

function Chat() {
  const { data } = useSession();
  const [text, setText] = useState<string>("");
  async function getdata() {
    const response = await customFetch({
      token: data?.session?.token as string,
      method: "POST",
      path: "chat",
    });

    const textDecoder = new TextDecoder();

    if (response.body === null) {
      console.log("null");
      return;
    }
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("done", done);
        // setText(text + textDecoder.decode(value));
        return;
      }
      console.log(textDecoder.decode(value));
      console.log("text", text);
      setText((prevtext) => prevtext + textDecoder.decode(value));
    }
  }
  // const { mutate, data: mutationData } = useMutation({
  //   mutationKey: ["chat"],
  //   mutationFn: getdata,
  // });

  return (
    <SidebarLayout>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Button
          onClick={() => {
            setText("");
            getdata();
          }}
        >
          Send
        </Button>
        <br />
        yes
        <br />
        {/* {JSON.stringify(mutationData?.data)}
        {console.log(mutationData)} */}
        {text}
      </div>
    </SidebarLayout>
  );
}

export default Chat;
