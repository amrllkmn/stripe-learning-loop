import axios from "axios";
import useSWR from "swr"; // This is a library for data-fetching

// Assumption: Product is stored over a server and is fetched

export default function useProduct() {
    const handleError = (error) => {
        switch (error) {
            case 500:
                const message = { message: "The server failed" }
                console.error(error)
                return message
            default:
                break;
        }
    }
    const YOUR_DOMAIN = 'http://localhost:4242/products';
    const { data: product, error } = useSWR(YOUR_DOMAIN,
        async (url) =>
        fetch(url).then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw response.status
        }),
        {
            initialData: null,
            onError: (error) => {
                handleError(error)

            }
        }
    )

    const submitItem = async (data) => {
        console.log(data)
        axios({
            method: 'post',
            url: 'http://localhost:4242/create-checkout-session',
            headers: { 'Content-Type': 'application/json' },
            data: {
               line_items: [
                   data
               ]
            }
          }).then((response)=> {console.log(response)}).catch((error) => console.error)
    }
    return {
        // return fake data here
        product: {
            data:{
                line_items: [
                  {
                    item_name: "Stubborn Attachments",
                    price_id: 'price_1Kf3J2BlskhJl6mE9F2k7Opu',
                    price: '20.00'
                  },
                  {
                    item_name: "Stubborn Attachments 2: Electric Bogaloo",
                    price_id: 'price_1Kf3JoBlskhJl6mEEYuiMUcs',
                    price: '35.00'
                  },
                ],
              }
        },
        error,
        submitItem
    }
}