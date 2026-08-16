/**
 * storefront api client
 *
 * this is just one tiny helper that all the graphql calls in the app go through.
 * storefront api is graphql only, so every request is a post to the same url,
 * and the real query and variables go in the body instead of in the url.
 * this allows me to reuse the same fetch logic for both the lookbook metaobject query and the product queries, instead of repeating the same fetch code in multiple places.
 */

// `config` is the same object made in index.jsx from the div's data-* values.
// `query` is the graphql string, and `variables` is just the object with
// all the dynamic values we want to plug into the query.

export async function queryStorefront(config, query, variables) {
    // queryStorefront is imported on lookbook.jsx file
  const endpoint = `https://${config.shopDomain}/api/${config.apiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // this header tells shopify which token is making the request,
      // so it knows whether this app is allowed to read that data.
      // this is generated from the private app's storefront access token I created through the legacy app development page
      "X-Shopify-Storefront-Access-Token": config.storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  // `await response.json()` reads the body. graphql often still responds with 200 even when the query itself is bad, so the real errors live inside the json under "errors". that's why we check that manually instead of just trusting response.
  const { data, errors } = await response.json();

  if (errors && errors.length > 0) {
    throw new Error(errors.map((e) => e.message).join("; "));
  }

  return data;
}