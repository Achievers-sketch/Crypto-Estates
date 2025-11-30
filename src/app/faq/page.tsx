import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata = {
  title: 'FAQ - Crypto Estates',
  description: 'Frequently asked questions about buying real estate with cryptocurrency.',
};

const faqs = [
    {
        question: "What cryptocurrencies can I use for payment?",
        answer: "We currently support Bitcoin (BTC), Ethereum (ETH), and Tether (USDT). We are actively working to include more cryptocurrencies in the future."
    },
    {
        question: "Is buying property with crypto secure?",
        answer: "Yes. All transactions are handled through secure, audited smart contracts or a trusted escrow service. We prioritize the security of your funds and personal information throughout the entire process."
    },
    {
        question: "How are crypto prices determined?",
        answer: "We use real-time price feeds from major, reputable exchanges to determine the conversion rate at the time of the transaction. The rate is locked in for a short period to allow you to complete your payment."
    },
    {
        question: "What are the transaction fees?",
        answer: "Transaction fees include standard blockchain network fees (gas fees) and a small platform fee to cover operational costs. All fees are transparently displayed before you confirm the transaction."
    },
    {
        question: "What happens after I complete the payment?",
        answer: "Once your transaction is confirmed on the blockchain, you will receive an email confirmation and access to all legal documents and deeds through your user dashboard. Our team will then guide you through the final steps of the handover process."
    },
    {
        question: "Do I need to do KYC/AML?",
        answer: "Yes, to comply with international regulations, a Know Your Customer (KYC) and Anti-Money Laundering (AML) check is required for all purchases. This is a one-time process and can be completed through your user dashboard."
    }
]

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Find answers to common questions about purchasing property with digital assets.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
