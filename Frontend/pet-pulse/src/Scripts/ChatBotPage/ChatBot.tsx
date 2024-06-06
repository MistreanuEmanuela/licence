import React, { useState, ChangeEvent, FormEvent } from 'react';
interface QueryResult {
    responseId: string;
    queryResult: {
      advancedSettings: any;
      currentPage: { name: string; displayName: string };
      diagnosticInfo: any;
      intent: { name: string; displayName: string };
      intentDetectionConfidence: number;
      languageCode: string;
      match: { intent: any; resolvedInput: string; matchType: string; confidence: number };
      responseMessages: { responseType: string; text: { text: string[] } }[];
    };
    responseType: string;
  }
  
const ChatBot: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer ya29.c.c0AY_VpZjc1jK7WtB1_PDD_5flzYcKS9nqhFzBTN5Gs9lHnkWi6dtS4LSp4bSUPdylmDyarz_ZJPYleVOWjKxAdnNIUMlFFNvhtGKHZjklgxRjK4yBzq3oKKny6Wc_7rkJQT1Njoco6k_BmLoixCV4zmihwSRrZthpLaStCtsPdl6q4xvUFRP4wpn28GIvpP3KIQI04tKFVfleERAhJThd_hcEqUoIMECIAnHcJw8vreS4L7hOyUz9JGNN3vvKl1HKszxHM8VUjSvGwRojyH7QNQUOjg8zJZj43z4CgVlxGZo7uojjOuF7eWDxsK8nlN_Mr035ANeHo4Z9O0z7ZvvfKKoj-i87Vh4vS6IB8cXahnq6xk1WaLqDDn_mG385Pile86v4V9QxZOhs2mjmkSpS6_40j0yB5un4vp2Ruut-IZ03eqZFxgc8pSa6WvdotqI2wUwi6UtfOQqluz0SBbVi6QZncndcMg9BnV226dVOgi69_80ZQvYrRIrdXVofp7YZJVkOBZplsbFwumnrs5UWSz9RpmJdlgQykWhu4M-15vdVxOt2vpu5qzUcuwb9aseOFZz9QYItZlYnaph3iY6aSJ14Bq--r66F5IRqeY2kZs8hbphowSUlgRpVn4saqlMX95Yp-o7yek4ZvkckMq9OeddoqQqRzdlyMheetX9snRpRa0kts51ybebSgUI0OXggj5oRR5pZMlVi9adFXOk1zM5oInip3YlbrqdWfWlg6rWeFqor_Wr9rsw_OYh7UUSkVRxXId_aMu4cf6wtF_Yl0ausgF423Z4ifx5jdn9k5Obu47M32iSM4617hgmQz7SFaoks7cW4rUasOZUQn_xiZv4n6OR4mIUe0JZwq1BMJORY75rn56j5soVp109JoQJWy6pjfbsga6md5eSJlyS31rcIjMZaRdFUtcSdR5YXnjSgXJMgdY---9klYhM79BqfsmOXOS_bkUqR4vFQ3fshs9l7iI2SwWmrwnhVMpcp7I1rOWW7yu8_5a0            ");

            const raw = JSON.stringify({
            "queryInput": {
                "text": {
                "text": inputText
                },
                "languageCode": "en"
            }
            });

            const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
            };

            const response = await fetch("https://dialogflow.googleapis.com/v3/projects/chatbotproject-425609/locations/global/agents/20d81fdb-61a7-4eea-bb1d-f239b59d44fd/sessions/32908026-0a65-48ed-b076-6ab2d3481fa3:detectIntent", requestOptions);
            if (!response.ok) {
            throw new Error('Failed to fetch');
            }
            const data: QueryResult = await response.json();
            console.log(data)
            setQueryResult(data);
            console.log(!data.queryResult.responseMessages[0])
            console.log(queryResult);
        } catch (error) {
            console.error('Error:', error);
        }
        };

  return (
    <div>
      <h1>Chat Bot</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputText">Enter Text:</label>
        <input
          type="text"
          id="inputText"
          value={inputText}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
      {queryResult && (
        <div>
          <h2>Response:</h2>
          <p>{!queryResult.queryResult}</p>
        </div>
      )}
    </div>
  );
}

export default ChatBot;