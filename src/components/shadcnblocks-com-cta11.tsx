"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/context/login-context";

interface Cta11Props {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url?: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const Cta11 = ({
  heading = "Ready to Get Started?",
  description = "Join thousands of satisfied customers using our platform to build amazing websites.",
  buttons = {
    primary: {
      text: "Get Started",
    },
    secondary: {
      text: "Learn More",
      url: "https://www.shadcnblocks.com",
    },
  },
}: Cta11Props) => {
  const { openLogin } = useLogin();

  return (
    <section className="py-24 mx-auto w-full max-w-6xl px-4">
      <div className="container flex items-center justify-center">
        <div className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16 w-full">
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {heading}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            {buttons.secondary && (
              <Button
                variant="outline"
                className="w-full sm:w-auto cursor-pointer"
                asChild
              >
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
            {buttons.primary && (
              <Button
                className="w-full sm:w-auto cursor-pointer"
                onClick={openLogin}
              >
                {buttons.primary.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta11 };
