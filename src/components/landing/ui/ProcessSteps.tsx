import { ProcessStep } from "./ProcessStep";

export interface StepItem {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: StepItem[];
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="relative">
      <div
        className="absolute left-5 top-5 bottom-5 w-px border-l-2 border-dashed border-[#e5e7eb]"
        aria-hidden
      />
      <div className="space-y-10">
        {steps.map((step, index) => (
          <ProcessStep
            key={step.title}
            number={index + 1}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
}
