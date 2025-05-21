import { Request, Response } from "express";
import { initaitePayment, verifyPayment } from "../services/payment.service.js";


export const initaitePaymentHandler = async(req: Request, res: Response): Promise<void> => {
    try {
        const {email, amount, name} = req.body;

        if(!email || !amount){
             res.status(400).json({
                success: false,
                message: "Email and amount are required"
            })
            return
        }

        const paymentData = initaitePayment({email, amount, name});
        console.log(`Payment initialted for ${name}, amount: ${amount}`);
         res.status(200).json({
            status: "success",
            message: "Payment was successfully initiated",
            data: paymentData
        })
    } catch (error) {
      res.status(500).json({
      status: 'error',
      message: error || 'Internal server error',
    });
    }
}


export const paymentStatusHandler = async(req: Request, res: Response): Promise<void> => {
    try {
        const {reference} = req.params;
        if(!reference){
             res.status(400).json({
                status: 'error',
                message: 'Payment reference is required',
            });
            return
        }

        const paymentData = await verifyPayment(reference);
        console.log(`Payment status checked for reference: ${reference}`);
            res.status(200).json({
            success: true,
            message: "Payment was made successfully",
            data: paymentData
        })
    } catch (error) {
      res.status(500).json({
      status: 'error',
      message: error || 'Internal server error',
    });
    }
}