const { VertexAI } = require('@google-cloud/vertexai');

exports.prompt = onRequest(async (request, response) => {
  const vertex_ai = new VertexAI({project: process.env.GCLOUD_PROJECT, location: 'us-central1'});
  
  // Available models: https://cloud.google.com/vertex-ai/docs/generative-ai/learn/models
  const model = 'gemini-pro';

  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generation_config: { // Test impact of parameters: https://makersuite.google.com
      "max_output_tokens": 2048,
      "temperature": 0.9,
      "top_p": 1
    },
  });

  const prompt = `Tell me a joke`;
  const req = {
    contents: [{role: 'user', parts: [{text: prompt}]}],
  };

  const content = await generativeModel.generateContent(req);
  const result = content.response.candidates.at(0).content.parts.at(0).text;
  response.send(result);
});