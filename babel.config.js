module.exports = {
  presets: ["next/babel"],
  plugins: [],
  env: {
    STRIPE_PKEY: process.env.STRIPE_PKEY,
  },
}
