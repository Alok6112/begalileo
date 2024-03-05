import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { View, Text } from "react-native";

import * as Constants from "../../components/helpers/Constants";

import { useStripe } from "@stripe/stripe-react-native";

const PaymentDoScreen = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    initiatePayment(custId, epheremalKey, payIntId, payIntSecret, isFrom) {
      initializePaymentSheet(
        custId,
        epheremalKey,
        payIntId,
        payIntSecret,
        isFrom
      );
    },
  }));

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const initializePaymentSheet = async (
    custId,
    epheremalKey,
    payIntId,
    payIntSecret,
    isFrom
  ) => {
    console.log("Initialize payment");

    const { error } = await initPaymentSheet({
      customerId: custId,
      customerEphemeralKeySecret: epheremalKey,
      paymentIntentClientSecret: payIntSecret,
      merchantDisplayName: "beGalileo",
      allowsDelayedPaymentMethods: true,
      returnURL: "reactstripebegalileo://stripe-redirect",
    });
    if (!error) {
      openPaymentSheet(payIntId, isFrom);
    }
  };

  const openPaymentSheet = async (payIntId, isFrom) => {
    console.log("Open payment ");
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log("Error ", error);
    } else {
      console.log("Succcess : ", payIntId, isFrom);
      props.updateCartPaymentStatus(payIntId, isFrom);
    }
    // see below
  };

  return <View style={{ position: "absolute" }}></View>;
});

export default PaymentDoScreen;

// export const PaymentDoScreen =  forwardRef((props,ref) =>{
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(false);

//   const initializePaymentSheet = async () => {
//     console.log("Initialize payment")

//     const { error } = await initPaymentSheet({
//       customerId: 'cus_M8Q9CmUCtqUIy7',
//       customerEphemeralKeySecret: 'ek_test_YWNjdF8xSWhDRmFTQk83MGtLUXRKLDlsUXlWV3FlZ2Z1TzhvYVhpUVZTVHJtdFhZVEVQWWM_00RWD8nVoA',
//       paymentIntentClientSecret: 'pi_3LQ9LbSBO70kKQtJ0dxsP3ut_secret_RR3NdIB6sxOHCB0Am320vKhcS',

//       // customerId: customer,
//       // customerEphemeralKeySecret: ephemeralKey,
//       // paymentIntentClientSecret: paymentIntent,
//       // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
//       //methods that complete payment after a delay, like SEPA Debit and Sofort.
//       allowsDelayedPaymentMethods: true,
//     });
//     if (!error) {
//       setLoading(true);
//     }
//   };

//   const openPaymentSheet = async () => {
//     console.log("Open payment ")
//     const { error } = await presentPaymentSheet();

//     if (error) {
//       console.log("Error ", error)

//     } else {
//       console.log("Succcess")
//     }
//     // see below
//   };

//   useEffect(() => {
//     initializePaymentSheet();
//   }, []);

//   return (
//     <View>

//     </View>
//   );
// }
