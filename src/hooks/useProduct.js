import useSWR from "swr"; // This is a library for data-fetching

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
}