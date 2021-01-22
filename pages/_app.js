import "../styles/globals.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="mx-auto max-w-2xl px-8 py-12">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
