import pdf from "html-pdf";
import getVueHtml from "../templates/main.js";
import wkhtmltopdf from "wkhtmltopdf";

const options = {
  format: "A4",
  orientation: "portrait",
};

export const print = async (req, res) => {
  try {
    const data = {
      title: "POTENCIAL DE DESARROLLO",
      subTopics: [
        { id: 1, title: "Dev y diseño" },
        { id: 2, title: "Adminy ventas" },
        { id: 3, title: "Direccion" },
      ],
      topics: [
        {
          title: "Habilidades y competencias",
          score: 4.3,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          strenghts: [
            {
              title: "Mentalidad de crecimiento",
              score: 4.6,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
            {
              title: "Conciencia social",
              score: 4.5,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
            {
              title: "Autogestion",
              score: 4.6,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
          ],
          opportunities: [
            {
              title: "Autodidacta",
              score: 4.0,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
            {
              title: "Perseverancia",
              score: 3.5,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
          ],
        },
        {
          title: "Bienestar",
          score: 4.1,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          strenghts: [
            {
              title: "Mentalidad de crecimiento",
              score: 4.6,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
            {
              title: "Conciencia social sdsdfsdfsdf sdf sdf",
              score: 4.5,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
            {
              title: "Autogestion",
              score: 4.6,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
          ],
          opportunities: [
            {
              title: "Autodidacta",
              score: 4.0,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
            {
              title: "Perseverancia",
              score: 3.5,
              sub: [
                {
                  subTopicId: 1,
                  score: 4.1,
                },
                { subTopicId: 2, score: 4.6 },
                { subTopicId: 3, score: 4.3 },
              ],
            },
          ],
        },
      ],
    };

    let html = await getVueHtml(data);

    html = html.replaceAll("&quot;", '"');

    pdf.create(html, options).toStream((err, stream) => {
      if (err) res.send(err);

      res.setHeader("Content-disposition", "attachment; filename=test.pdf");
      return stream.pipe(res);
    });
  } catch (error) {
    console.log(error);
  }
};
