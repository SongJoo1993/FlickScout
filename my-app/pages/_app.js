import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";
import SSRProvider from "react-bootstrap/SSRProvider";

export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <RouteGuard>
        <Layout>
          <SWRConfig
            value={{
              fetcher: (...args) => fetch(...args).then((res) => res.json()),
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </Layout>
      </RouteGuard>
    </SSRProvider>
  );
}
