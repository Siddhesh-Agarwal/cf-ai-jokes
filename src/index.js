export default {
  async fetch(request, env) {
    // Get the topic from URL parameters
    const url = new URL(request.url);
    const topic = url.searchParams.get('topic') || 'Programming'; // Default to 'general' if no topic provided

    // Create prompt with dynamic topic
    let simple = {
      prompt: `Tell me a joke about ${topic}`
    };

    try {
      let response = await env.AI.run('@hf/google/gemma-7b-it', simple);
      return Response.json({ topic: topic, response });
    } catch (error) {
      return Response.json({
        error: 'Failed to generate joke',
        message: error.message
      }, { status: 500 });
    }
  }
};
