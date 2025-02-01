module.exports = function (api) {
  api.cache(true);
  console.log("Babel configuration loaded");

  const presets = [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
        // "importSource": "custom-jsx-library" // Uncomment if using a custom JSX library
      }
    ],
    "next/babel",
    "@babel/preset-typescript",
  ];
    
  const plugins = [];
  
  if (process.env["ENV"] === "prod") {
    // Add production-specific plugins here
    // plugins.push(...);
  }

  return {
    presets,
    plugins
  };
}
