import axios from 'axios';
import config from '../config/index.js'
import { InitialPaymentRequests, PaymentStatusResponse } from '../interfaces/payment.interface.js';


export const initaitePayment = async(paymentData: InitialPaymentRequests) => {
    try {
        const response = await axios.post(
            `${config.paystack.baseURL}/transaction/initialize`,
            {
                email: paymentData.email,
                amount: paymentData.amount,
                name: paymentData.name
            },{
                headers: {
                    Authorization: `Bearer ${config.paystack.secretKey}`,
                    'Content-Type': "application/json"
                }
            }
        );
        return response.data.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message || "Payment Initialization failed")
        }
         throw new Error('Payment initiation failed');
    }
}



export const verifyPayment = async (reference: string) => {
    try {
        const response = await axios.get(
            `${config.paystack.baseURL}/transaction/verify/${reference}`,
        {
            headers: {
                Authorization: `Bearer ${config.paystack.secretKey}`
            }
        }
        );

        return response.data.data as PaymentStatusResponse;
    }  catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Payment verification failed');
    }
    throw new Error('Payment verification failed');
  }
}