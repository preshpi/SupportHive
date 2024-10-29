import { FeedbackProps } from "../../types/settings";
import { Button } from "../Button";

const Feedback = ({
  registerFeedback,
  errorsFeedback,
  onSubmitFeedback,
  isFeedbackSubmitting,
  handleSubmitFeedback,
}: FeedbackProps) => {
  return (
    <div className="space-y-5 max-w-[550px]">
      <p className="font-bold text-2xl">Send us your feedback</p>
      <p className="text-x text-[#777777]">
        Bugs? Honest feedback would be appreciated. You can also send new
        features you want us to add.
      </p>

      <form className="flex flex-col gap-y-1 w-full ">
        <div>
          <textarea
            id="feedback"
            {...registerFeedback("feedback")}
            placeholder="Let us know your feedback..."
            className="w-full outline-none  focus:ring-1 ring-black rounded-md border border-gray-100 bg-transparent px-4 py-4 text-[14px] font-light"
          ></textarea>

          {errorsFeedback.feedback && (
            <span className="text-red-500 text-sm">{`${errorsFeedback.feedback.message}`}</span>
          )}
        </div>
        <div className="max-w-[200px] mt-3">
          <Button
            disabled={isFeedbackSubmitting}
            loading={isFeedbackSubmitting}
            onClick={handleSubmitFeedback(onSubmitFeedback)}
            className="bg-normal-300 text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Changes{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
