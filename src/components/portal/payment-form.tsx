import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CreditCard } from "lucide-react";

interface PaymentFormProps {
  invoiceId: number;
  amount: string;
  invoiceNumber: string;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentForm({ 
  invoiceId, 
  amount, 
  invoiceNumber, 
  onPaymentSuccess, 
  onCancel 
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      // Confirm the payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/portal?payment=success`,
        },
        redirect: "if_required",
      });

      if (error) {
        throw new Error(error.message);
      }

      // Payment successful
      toast({
        title: "Payment Successful",
        description: `Invoice #${invoiceNumber} has been paid successfully.`,
      });

      onPaymentSuccess();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Payment processing failed",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Pay Invoice #{invoiceNumber}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold text-center">
            ${parseFloat(amount).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Secure payment processed by Stripe
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PaymentElement />
          
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!stripe || isProcessing}
              className="flex-1 bg-primary text-white hover:bg-primary/90"
            >
              {isProcessing ? "Processing..." : `Pay $${parseFloat(amount).toFixed(2)}`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}