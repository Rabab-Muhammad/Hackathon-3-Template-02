// const { withSentryConfig } = require("@sentry/nextjs")

// const moduleExports = {

// }

// const SentryWebpackPluginOptions = {
//     silent:true,
// }

// module.exports = withSentryConfig(moduleExports,SentryWebpackPluginOptions);

import { withSentryConfig } from "@sentry/nextjs";

const moduleExports = {};

const SentryWebpackPluginOptions = {
  silent: true,
};

export default withSentryConfig(moduleExports, SentryWebpackPluginOptions);
