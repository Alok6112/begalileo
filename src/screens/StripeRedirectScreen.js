import React, { useEffect, useCallback } from "react";
import { Linking } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";

import { View } from "react-native";

export default function StripeRedirectScreen() {
  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url) => {
      if (url) {
        console.log("url h1", url);
        const stripeHandled = await handleURLCallback(url);

        console.log("stripeHandled h2", stripeHandled);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener("url", (event) => {
      console.log("deepLinkListener event triggered");
      handleDeepLink(event.url);
    });

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return <></>;
}
