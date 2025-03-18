import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  mcqs: [
    {
      title: {
        type: String,
        required: true,
        minlength: 1,
      },
      options: [
        {
          option: {
            type: String,
            required: true,
            minlength: 1,
          },
        },
      ],
      correctOption: {
        type: Number,
        required: true,
      },
      explanation: {
        type: String,
      },
    },
  ],
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: "Section",
    // required: true,
  },
});

type QuizType = Model<InferSchemaType<typeof quizSchema>>;

const Quiz: QuizType = models.Quiz || model("Quiz", quizSchema);

export default Quiz;
