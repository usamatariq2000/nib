import type { CategoryId, Tool } from "./types";

/**
 * The single source of truth for every tool. Homepage, search, category
 * pages, sitemap, related-tool links and per-page metadata all read from
 * here. Adding a tool = add an entry + a route folder that renders it.
 */
export const tools: Tool[] = [
  // ─────────────────────────────── Calculators ───────────────────────────────
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, changes and shares.",
    tagline:
      "Work out percentages, percentage change, increases and decreases without doing the math by hand.",
    category: "calculate",
    keywords: ["percent", "%", "percentage change", "percent of", "increase", "decrease"],
    icon: "percent",
    popular: true,
    local: true,
    related: ["discount-calculator", "ratio-calculator", "age-calculator"],
    content: {
      what: "This calculator answers the three questions people ask most about percentages: what is X% of a number, what percentage one number is of another, and how much a value changed in percent from one figure to the next.",
      how: [
        "Pick the question that matches what you need — 'percent of', 'X is what percent of Y', or 'percentage change'.",
        "Type your two numbers into the fields.",
        "The result updates instantly as you type — no button required.",
      ],
      examples: [
        "25% of 400 = 100",
        "45 is 30% of 150",
        "From 80 to 100 is a 25% increase",
      ],
      faqs: [
        {
          q: "How do I calculate what percentage one number is of another?",
          a: "Divide the part by the whole and multiply by 100. For example, 45 out of 150 is (45 ÷ 150) × 100 = 30%. The 'X is what percent of Y' mode does this for you.",
        },
        {
          q: "What is the difference between percentage change and percentage points?",
          a: "Percentage change is relative: going from 10% to 15% is a 50% increase. Percentage points are absolute: that same move is a 5 percentage-point increase. This tool reports relative percentage change.",
        },
        {
          q: "Does the calculator round the result?",
          a: "Results are shown to a sensible number of decimals and trailing zeros are trimmed. The underlying calculation uses full precision.",
        },
      ],
    },
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age from a birth date.",
    tagline:
      "Find an exact age in years, months and days — plus total weeks, days and the next birthday countdown.",
    category: "calculate",
    keywords: ["age", "birthday", "date of birth", "how old", "years months days"],
    icon: "cake",
    local: true,
    related: ["date-difference-calculator", "percentage-calculator", "timestamp-converter"],
    content: {
      what: "Enter a date of birth (and optionally an 'age at' date) to get an exact age broken down into years, months and days, along with totals in months, weeks, days and hours and a countdown to the next birthday.",
      how: [
        "Choose the date of birth.",
        "Leave the second date as today, or set it to calculate age on a specific day.",
        "Read the exact age and the extra totals below it.",
      ],
      examples: [
        "Born 1990-06-15, today: 35 years, 3 months, 15 days",
        "Total days lived shown alongside weeks and months",
      ],
      faqs: [
        {
          q: "How is the exact age calculated?",
          a: "It counts whole years first, then whole months, then the remaining days, accounting for months of different lengths and leap years — the same way you'd say your age out loud.",
        },
        {
          q: "Does it handle leap years?",
          a: "Yes. February 29 birthdays and leap years are handled correctly when counting days and totals.",
        },
        {
          q: "Can I calculate age on a future or past date?",
          a: "Yes. Set the second date to any day to find how old someone was — or will be — on that date.",
        },
      ],
    },
  },
  {
    slug: "ratio-calculator",
    name: "Ratio Calculator",
    description: "Simplify, scale and solve ratios.",
    tagline:
      "Simplify ratios to their lowest terms, scale them up or down, and solve for a missing value.",
    category: "calculate",
    keywords: ["ratio", "proportion", "aspect ratio", "simplify", "scale", "a:b"],
    icon: "ratio",
    local: true,
    related: ["percentage-calculator", "discount-calculator", "date-difference-calculator"],
    content: {
      what: "Work with ratios two ways: simplify a ratio like 1920:1080 to its lowest terms, or solve a proportion where one of the four values is unknown (A is to B as C is to ?).",
      how: [
        "To simplify, enter both sides of the ratio and read the reduced form.",
        "To solve a proportion, fill any three of the four boxes and leave the unknown blank.",
        "Results, including the decimal equivalent, update as you type.",
      ],
      examples: [
        "1920:1080 simplifies to 16:9",
        "3:4 = 9:? solves to 12",
        "2:5 as a decimal is 0.4",
      ],
      faqs: [
        {
          q: "How do you simplify a ratio?",
          a: "Divide both numbers by their greatest common divisor. For 1920:1080 the GCD is 120, giving 16:9. The tool does this automatically.",
        },
        {
          q: "Can it solve for a missing number in a proportion?",
          a: "Yes. Enter three of the four values in the A:B = C:D form and leave one blank — the calculator cross-multiplies to find it.",
        },
      ],
    },
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate sale prices and savings.",
    tagline:
      "Find the final price after a discount, how much you save, and the effective percentage off.",
    category: "calculate",
    keywords: ["discount", "sale", "percent off", "savings", "price", "markdown"],
    icon: "tag",
    local: true,
    related: ["percentage-calculator", "ratio-calculator", "age-calculator"],
    content: {
      what: "Enter an original price and a discount to see the amount saved and the final price. You can also work backwards from a sale price to find the percentage off.",
      how: [
        "Enter the original price.",
        "Enter the discount as a percentage (or switch to a fixed amount).",
        "Read the amount saved and the final price instantly.",
      ],
      examples: [
        "$80 with 25% off = $60 (you save $20)",
        "$120 down to $90 is 25% off",
      ],
      faqs: [
        {
          q: "How do I calculate a percentage discount?",
          a: "Multiply the price by the discount percentage to get the saving, then subtract it. $80 × 25% = $20 off, leaving $60.",
        },
        {
          q: "Can I stack two discounts?",
          a: "Apply them in sequence, not by adding the percentages. 20% then 10% off $100 is $100 → $80 → $72, an effective 28% off — not 30%.",
        },
      ],
    },
  },
  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    description: "Days, weeks and months between dates.",
    tagline:
      "Count the exact time between two dates in years, months, weeks, days — with or without weekends.",
    category: "calculate",
    keywords: ["date difference", "days between", "duration", "how many days", "countdown"],
    icon: "calendar",
    local: true,
    related: ["age-calculator", "timestamp-converter", "percentage-calculator"],
    content: {
      what: "Pick a start and end date to get the full duration between them: a years-months-days breakdown plus totals in weeks, days and business days (excluding weekends).",
      how: [
        "Choose the start date.",
        "Choose the end date.",
        "Read the breakdown and the total counts, including business days.",
      ],
      examples: [
        "Jan 1 to Dec 31, 2025 = 364 days",
        "Business days between two dates, weekends excluded",
      ],
      faqs: [
        {
          q: "Does the count include both the start and end dates?",
          a: "The difference is the number of days between the two dates. Whether the endpoints are 'included' depends on your use — the tool shows the raw gap so you can add one if you need an inclusive count.",
        },
        {
          q: "How are business days counted?",
          a: "Business days count Monday through Friday and skip Saturdays and Sundays. Public holidays are not subtracted, since they vary by country.",
        },
      ],
    },
  },

  // ─────────────────────────────── Finance ───────────────────────────────
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    description: "Estimate your monthly mortgage payment.",
    tagline:
      "Estimate your monthly mortgage payment — principal, interest, taxes and insurance — and see the total cost over the life of the loan.",
    category: "finance",
    keywords: ["mortgage", "home loan", "monthly payment", "amortization", "piti", "interest", "property"],
    icon: "home",
    popular: true,
    local: true,
    related: ["loan-calculator", "compound-interest-calculator", "percentage-calculator", "discount-calculator"],
    content: {
      what: "Enter a home price, down payment, interest rate and term to estimate your monthly mortgage payment. The breakdown separates principal and interest from optional property tax, home insurance and HOA fees, and shows how much interest you'll pay over the full loan.",
      how: [
        "Enter the home price and your down payment.",
        "Set the loan term and interest rate.",
        "Optionally add property tax, insurance and HOA to see your full monthly payment.",
      ],
      examples: [
        "$400,000 home, 20% down, 30 years at 6.5% ≈ $2,022/mo principal & interest",
        "See how much total interest a 15-year vs 30-year term costs",
      ],
      faqs: [
        {
          q: "What does PITI mean?",
          a: "PITI stands for Principal, Interest, Taxes and Insurance — the four parts of a typical monthly mortgage payment. This calculator shows each part so you see your true monthly cost, not just principal and interest.",
        },
        {
          q: "How is the monthly mortgage payment calculated?",
          a: "Principal and interest use the standard amortization formula: M = P × r(1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the loan amount, r is the monthly interest rate, and n is the number of payments. Taxes and insurance are added on top.",
        },
        {
          q: "Does a bigger down payment lower my payment?",
          a: "Yes. A larger down payment reduces the loan amount, which lowers both the monthly payment and the total interest paid. Putting at least 20% down also typically avoids private mortgage insurance (PMI).",
        },
      ],
    },
  },
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate loan payments and total interest.",
    tagline:
      "Work out the monthly payment, total interest and total cost of any fixed-rate loan — personal, auto or student.",
    category: "finance",
    keywords: ["loan", "monthly payment", "interest", "auto loan", "car loan", "personal loan", "amortization", "emi"],
    icon: "bank",
    popular: true,
    local: true,
    related: ["mortgage-calculator", "compound-interest-calculator", "percentage-calculator", "sales-tax-calculator"],
    content: {
      what: "Enter a loan amount, interest rate and term to see your fixed monthly payment, the total interest you'll pay, and the total amount repaid. Works for car loans, personal loans, student loans and any other amortizing fixed-rate loan.",
      how: [
        "Enter the loan amount.",
        "Set the annual interest rate and the term in months or years.",
        "Read your monthly payment, total interest and total repaid.",
      ],
      examples: [
        "$25,000 car loan over 5 years at 7% ≈ $495/mo",
        "$10,000 personal loan over 3 years at 10% ≈ $323/mo",
      ],
      faqs: [
        {
          q: "How is a monthly loan payment calculated?",
          a: "It uses the amortization formula: M = P × r(1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the loan amount, r is the monthly rate (annual rate ÷ 12), and n is the number of monthly payments. Each payment covers that month's interest plus a bit of principal.",
        },
        {
          q: "What is the difference between interest rate and APR?",
          a: "The interest rate is the cost of borrowing the principal. APR (annual percentage rate) also includes certain fees, so it's usually slightly higher and gives a fuller picture of the loan's cost. This tool uses the interest rate.",
        },
        {
          q: "Will paying extra each month save money?",
          a: "Yes. Extra payments go straight to principal, which reduces the balance faster and cuts the total interest you pay — often by a surprising amount over the life of the loan.",
        },
      ],
    },
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "See how savings grow over time.",
    tagline:
      "See how an investment or savings balance grows with compound interest and regular contributions over time.",
    category: "finance",
    keywords: ["compound interest", "savings", "investment", "interest", "growth", "apy", "future value", "retirement"],
    icon: "growth",
    popular: true,
    local: true,
    related: ["loan-calculator", "mortgage-calculator", "percentage-calculator", "sales-tax-calculator"],
    content: {
      what: "Enter a starting amount, interest rate and time period to see how compound interest grows your balance. Add a regular monthly contribution to model a savings plan, and see how much of the final total is your own money versus earned interest.",
      how: [
        "Enter your starting balance and an optional monthly contribution.",
        "Set the annual interest rate and how often it compounds.",
        "Choose the number of years and read the projected final balance.",
      ],
      examples: [
        "$10,000 at 7% for 20 years grows to about $38,697",
        "Adding $200/month makes a large difference over time",
      ],
      faqs: [
        {
          q: "What is compound interest?",
          a: "Compound interest is interest earned on both your original balance and the interest already added. Because each period's interest earns its own interest, balances grow faster over time — the core reason long-term investing is powerful.",
        },
        {
          q: "How does compounding frequency affect growth?",
          a: "More frequent compounding (monthly or daily vs annually) earns slightly more, because interest is added to the balance sooner and starts earning on itself. The difference is modest but real over long periods.",
        },
        {
          q: "What is APY?",
          a: "APY (annual percentage yield) is the effective yearly return once compounding is included. A 6% rate compounded monthly has an APY of about 6.17%, which is why APY is the fairer way to compare savings accounts.",
        },
      ],
    },
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate tips and split the bill.",
    tagline:
      "Work out the tip and total in seconds, and split the bill evenly across any number of people.",
    category: "finance",
    keywords: ["tip", "gratuity", "bill", "split", "restaurant", "percentage", "per person"],
    icon: "receipt",
    popular: true,
    local: true,
    related: ["sales-tax-calculator", "discount-calculator", "percentage-calculator", "loan-calculator"],
    content: {
      what: "Enter your bill amount and a tip percentage to see the tip and the total instantly. Split the bill across any number of people to get the amount each person owes, tip included.",
      how: [
        "Enter the bill amount.",
        "Choose a tip percentage or type your own.",
        "Set how many people are splitting to see the per-person amount.",
      ],
      examples: [
        "$80 bill at 18% = $14.40 tip, $94.40 total",
        "Split $94.40 between 4 people = $23.60 each",
      ],
      faqs: [
        {
          q: "How much should I tip?",
          a: "In the US, 15–20% of the pre-tax bill is customary for table service, with 20% for good service. Norms vary by country and service type, so adjust to your local custom.",
        },
        {
          q: "Should I tip on the pre-tax or post-tax amount?",
          a: "Tipping on the pre-tax subtotal is standard, though many people tip on the total for simplicity. Enter whichever amount you prefer as the bill.",
        },
        {
          q: "How is the per-person amount calculated?",
          a: "The tool adds the tip to the bill, then divides the total by the number of people — so each share already includes an equal part of the tip.",
        },
      ],
    },
  },
  {
    slug: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    description: "Add or remove sales tax from a price.",
    tagline:
      "Add sales tax to a price or work backwards from a total to find the pre-tax amount and the tax paid.",
    category: "finance",
    keywords: ["sales tax", "vat", "gst", "tax", "price", "net", "gross", "reverse tax"],
    icon: "receipt",
    local: true,
    related: ["tip-calculator", "discount-calculator", "percentage-calculator", "loan-calculator"],
    content: {
      what: "Enter a price and a tax rate to see the sales tax and the final total. Switch to reverse mode to start from a tax-inclusive total and find the original pre-tax price and the tax portion — useful for receipts and bookkeeping.",
      how: [
        "Enter the amount (pre-tax price, or a tax-inclusive total in reverse mode).",
        "Enter the sales tax rate as a percentage.",
        "Read the tax amount and the total, or the pre-tax price in reverse mode.",
      ],
      examples: [
        "$100 at 8% tax = $8 tax, $108 total",
        "Reverse: $108 total at 8% = $100 before tax",
      ],
      faqs: [
        {
          q: "How do I add sales tax to a price?",
          a: "Multiply the price by the tax rate to get the tax, then add it. $100 × 8% = $8 tax, for a $108 total. The calculator does this instantly.",
        },
        {
          q: "How do I calculate the pre-tax price from a total?",
          a: "Divide the tax-inclusive total by 1 plus the tax rate. $108 ÷ 1.08 = $100 before tax. Reverse mode does this for you and shows the tax portion.",
        },
        {
          q: "Does this work for VAT and GST?",
          a: "Yes. The math is the same for any single-rate sales tax, VAT or GST — just enter your local rate.",
        },
      ],
    },
  },

  // ─────────────────────────────── Developer ───────────────────────────────
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate and minify JSON.",
    tagline:
      "Pretty-print messy JSON, catch syntax errors with a clear message, and minify when you're done.",
    category: "develop",
    keywords: ["json", "format", "beautify", "pretty print", "validate", "minify", "lint"],
    icon: "braces",
    popular: true,
    local: true,
    related: ["base64-encoder", "url-encoder", "uuid-generator", "timestamp-converter"],
    content: {
      what: "Paste JSON to format it with clean indentation, or minify it to a single line. Invalid JSON is flagged with the line, column and reason so you can find the problem fast. Everything happens in your browser.",
      how: [
        "Paste or type JSON into the left pane.",
        "Choose Format to indent it or Minify to compact it.",
        "Copy or download the result, or Clear to start over.",
      ],
      examples: [
        '{"name":"John","tags":["a","b"]} formats onto multiple indented lines',
        "A trailing comma is reported with its exact position",
      ],
      faqs: [
        {
          q: "Is my JSON uploaded anywhere?",
          a: "No. The JSON Formatter runs entirely in your browser using the built-in JSON parser. Your data never leaves your device.",
        },
        {
          q: "Why does it say my JSON is invalid?",
          a: "Common causes are trailing commas, single quotes instead of double quotes, unquoted keys, or missing brackets. The error message points to the line and column so you can fix it quickly.",
        },
        {
          q: "What indentation does it use?",
          a: "Formatting uses two spaces by default, which is the most common convention. You can switch between 2 spaces, 4 spaces and tabs.",
        },
      ],
    },
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate v4 and v7 UUIDs instantly.",
    tagline:
      "Generate one or many UUIDs — cryptographically random v4 or time-ordered v7 — and copy them in a click.",
    category: "develop",
    keywords: ["uuid", "guid", "unique id", "identifier", "v4", "v7", "random id"],
    icon: "hash",
    popular: true,
    local: true,
    related: ["json-formatter", "base64-encoder", "timestamp-converter", "random-number-generator"],
    content: {
      what: "Generate universally unique identifiers on demand. Version 4 UUIDs are fully random; version 7 UUIDs embed a timestamp so they sort chronologically, which is handy for database keys. Generate up to hundreds at once.",
      how: [
        "A fresh UUID appears as soon as the page loads.",
        "Choose the version (v4 or v7) and how many you want.",
        "Copy a single value or the whole list.",
      ],
      examples: [
        "v4: 550e8400-e29b-41d4-a716-446655440000",
        "v7 values sort in the order they were created",
      ],
      faqs: [
        {
          q: "What is the difference between UUID v4 and v7?",
          a: "v4 is random, so identifiers are unpredictable but unordered. v7 puts a millisecond timestamp at the front, so IDs generated later sort after earlier ones — better for database primary keys and indexes.",
        },
        {
          q: "Are these UUIDs safe to use as unique keys?",
          a: "Yes. v4 uses the browser's cryptographically secure random generator, making collisions astronomically unlikely. They're suitable for database keys, request ids and file names.",
        },
        {
          q: "Are the UUIDs generated on a server?",
          a: "No. They're generated locally in your browser, so nothing is transmitted or logged.",
        },
      ],
    },
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode Base64 text.",
    tagline:
      "Convert text to Base64 and back. Unicode-safe, with a one-click swap between encode and decode.",
    category: "develop",
    keywords: ["base64", "encode", "decode", "btoa", "atob", "b64"],
    icon: "binary",
    local: true,
    related: ["url-encoder", "json-formatter", "uuid-generator", "timestamp-converter"],
    content: {
      what: "Encode plain text into Base64, or decode Base64 back into readable text. The conversion is fully Unicode-aware, so emoji and accented characters survive the round trip.",
      how: [
        "Type or paste your input.",
        "Toggle between Encode and Decode.",
        "Copy the result — it updates as you type.",
      ],
      examples: [
        "hello → aGVsbG8=",
        "aGVsbG8= → hello",
      ],
      faqs: [
        {
          q: "What is Base64 used for?",
          a: "Base64 encodes binary or text data as ASCII so it can travel safely through systems that expect text — data URLs, email attachments, JSON payloads and HTTP headers.",
        },
        {
          q: "Does it handle emoji and non-English text?",
          a: "Yes. Input is treated as UTF-8 before encoding, so characters outside the basic ASCII range are preserved exactly.",
        },
        {
          q: "Is Base64 encryption?",
          a: "No. Base64 is encoding, not encryption — anyone can decode it. Never use it to protect secrets.",
        },
      ],
    },
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    description: "Percent-encode and decode URLs.",
    tagline:
      "Percent-encode text for safe use in URLs, or decode an encoded string back to plain text.",
    category: "develop",
    keywords: ["url", "encode", "decode", "percent encoding", "uri", "querystring", "escape"],
    icon: "link",
    local: true,
    related: ["base64-encoder", "json-formatter", "uuid-generator", "timestamp-converter"],
    content: {
      what: "Encode text so it can be placed safely inside a URL or query string, or decode a percent-encoded string back to readable characters. Choose between component encoding (for a single value) and full-URI encoding.",
      how: [
        "Enter the text or URL you want to convert.",
        "Pick Encode or Decode, and component or full-URI mode.",
        "Copy the converted result.",
      ],
      examples: [
        "hello world → hello%20world",
        "a=1&b=2 encoded for use inside a query value",
      ],
      faqs: [
        {
          q: "What is the difference between encoding a component and a full URI?",
          a: "Component encoding escapes characters like &, =, ? and / because they're part of a single value. Full-URI encoding leaves those structural characters intact so a complete URL stays valid.",
        },
        {
          q: "Why do spaces become %20 or +?",
          a: "In URL paths a space becomes %20. In query strings, the application/x-www-form-urlencoded format uses +. This tool uses %20 for reliable, spec-compliant results.",
        },
      ],
    },
  },
  {
    slug: "timestamp-converter",
    name: "Unix Timestamp Converter",
    description: "Convert Unix time to dates and back.",
    tagline:
      "Convert between Unix timestamps and human-readable dates, in your local time zone or UTC.",
    category: "develop",
    keywords: ["unix", "timestamp", "epoch", "date", "utc", "iso 8601", "seconds", "milliseconds"],
    icon: "clock",
    local: true,
    related: ["date-difference-calculator", "age-calculator", "json-formatter", "uuid-generator"],
    content: {
      what: "Turn a Unix timestamp (seconds or milliseconds since 1970) into a readable date, or convert any date into a timestamp. Shows both local time and UTC, plus the ISO 8601 form. A live clock shows the current epoch time.",
      how: [
        "Enter a timestamp to see the date, or pick a date to see the timestamp.",
        "The tool auto-detects seconds vs milliseconds.",
        "Copy whichever format you need — local, UTC or ISO.",
      ],
      examples: [
        "1700000000 → Tue, 14 Nov 2023 22:13:20 UTC",
        "The current epoch time ticks live at the top",
      ],
      faqs: [
        {
          q: "What is a Unix timestamp?",
          a: "It's the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970, known as the Unix epoch. It's a compact, time-zone-free way to represent an instant.",
        },
        {
          q: "Seconds or milliseconds — which is it?",
          a: "Unix timestamps are traditionally in seconds (10 digits today). JavaScript and many APIs use milliseconds (13 digits). The converter detects the magnitude and handles both.",
        },
      ],
    },
  },

  // ─────────────────────────────── Text ───────────────────────────────
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters and reading time.",
    tagline:
      "Count words, characters, sentences and paragraphs as you write, with an estimated reading time.",
    category: "write",
    keywords: ["word count", "character count", "reading time", "essay", "sentences", "paragraphs"],
    icon: "text",
    popular: true,
    local: true,
    related: ["character-counter", "case-converter", "remove-duplicate-lines", "text-diff"],
    content: {
      what: "A distraction-free writing surface that counts words, characters (with and without spaces), sentences and paragraphs live as you type, and estimates how long the text takes to read and speak aloud.",
      how: [
        "Type or paste your text into the writing area.",
        "Watch the statistics update instantly at the bottom.",
        "Everything stays in your browser — nothing is sent anywhere.",
      ],
      examples: [
        "Track an essay against a 500-word target",
        "Check a tweet or meta description against a character limit",
      ],
      faqs: [
        {
          q: "How is reading time estimated?",
          a: "Reading time assumes an average of about 200–230 words per minute for silent reading. Speaking time uses a slower rate of around 130 words per minute.",
        },
        {
          q: "How are words counted?",
          a: "Words are counted as runs of non-whitespace characters, which matches how most word processors count. Numbers and hyphenated terms count as single words.",
        },
        {
          q: "Is my text saved or uploaded?",
          a: "No. The counter runs entirely in your browser and nothing you type is stored or transmitted.",
        },
      ],
    },
  },
  {
    slug: "character-counter",
    name: "Character Counter",
    description: "Count characters against common limits.",
    tagline:
      "Count characters with and without spaces, and check your text against social and SEO limits.",
    category: "write",
    keywords: ["character count", "letter count", "twitter", "meta description", "limit", "sms"],
    icon: "hash",
    local: true,
    related: ["word-counter", "case-converter", "remove-duplicate-lines", "text-diff"],
    content: {
      what: "Counts characters (with and without spaces), words and lines, and shows how your text measures up against common limits like tweets, SMS messages, and SEO title and meta-description lengths.",
      how: [
        "Type or paste your text.",
        "Read the live character and word counts.",
        "Check the limit indicators for the platforms you care about.",
      ],
      examples: [
        "Keep a meta description under 160 characters",
        "Fit a post within a 280-character limit",
      ],
      faqs: [
        {
          q: "Do spaces count as characters?",
          a: "Most platforms count spaces, so the primary figure includes them. A separate 'without spaces' count is shown for cases where only visible characters matter.",
        },
        {
          q: "What are the recommended SEO lengths?",
          a: "Aim for roughly 50–60 characters for a page title and up to about 155–160 for a meta description, so they aren't truncated in search results.",
        },
      ],
    },
  },
  {
    slug: "case-converter",
    name: "Text Case Converter",
    description: "Convert text between letter cases.",
    tagline:
      "Switch text between UPPERCASE, lowercase, Title Case, sentence case, camelCase, snake_case and more.",
    category: "write",
    keywords: ["case", "uppercase", "lowercase", "title case", "camelcase", "snake_case", "kebab-case"],
    icon: "type",
    local: true,
    related: ["word-counter", "character-counter", "remove-duplicate-lines", "text-diff"],
    content: {
      what: "Convert any text between common letter cases with one click: UPPERCASE, lowercase, Title Case, Sentence case, plus programmer cases like camelCase, PascalCase, snake_case and kebab-case.",
      how: [
        "Paste your text.",
        "Click the case you want to convert to.",
        "Copy the result, or keep converting between formats.",
      ],
      examples: [
        "hello world → Hello World (Title Case)",
        "hello world → helloWorld (camelCase)",
        "Hello World → hello-world (kebab-case)",
      ],
      faqs: [
        {
          q: "What is the difference between title case and sentence case?",
          a: "Title Case capitalises the first letter of each significant word (for headings). Sentence case capitalises only the first word of each sentence, like normal prose.",
        },
        {
          q: "When would I use camelCase or snake_case?",
          a: "They're naming conventions in code: camelCase for variables in many languages, snake_case in Python and databases, kebab-case for URLs and CSS class names.",
        },
      ],
    },
  },
  {
    slug: "text-diff",
    name: "Text Diff",
    description: "Compare two texts and see the changes.",
    tagline:
      "Compare two blocks of text and highlight exactly what was added, removed or changed.",
    category: "write",
    keywords: ["diff", "compare", "difference", "text compare", "changes", "merge"],
    icon: "diff",
    local: true,
    related: ["remove-duplicate-lines", "word-counter", "case-converter", "json-formatter"],
    content: {
      what: "Paste an original and a revised version to see a line-by-line comparison. Added lines, removed lines and changed lines are colour-coded so you can review edits at a glance — all computed in your browser.",
      how: [
        "Paste the original text on the left.",
        "Paste the changed text on the right.",
        "Review the highlighted differences below.",
      ],
      examples: [
        "Compare two drafts of an email",
        "Spot changes between two versions of a config file",
      ],
      faqs: [
        {
          q: "Does it compare line by line or word by word?",
          a: "It compares line by line and highlights which lines were added or removed, which is the clearest view for documents and code.",
        },
        {
          q: "Is my text sent to a server?",
          a: "No. The comparison runs entirely in your browser, so even sensitive documents stay on your device.",
        },
      ],
    },
  },
  {
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    description: "Delete duplicate lines from a list.",
    tagline:
      "Remove duplicate lines from any list, with options to sort, trim and ignore case.",
    category: "write",
    keywords: ["duplicate", "dedupe", "unique lines", "remove duplicates", "list", "sort"],
    icon: "list",
    local: true,
    related: ["text-diff", "word-counter", "case-converter", "character-counter"],
    content: {
      what: "Paste a list and get back only the unique lines. Optionally sort the result alphabetically, trim surrounding whitespace, ignore case when comparing, and drop empty lines. Useful for cleaning up exports, keyword lists and CSV columns.",
      how: [
        "Paste your list, one item per line.",
        "Choose options like sort, trim or ignore case.",
        "Copy the cleaned, de-duplicated result.",
      ],
      examples: [
        "Turn a list with repeats into a clean unique list",
        "Remove duplicate email addresses from an export",
      ],
      faqs: [
        {
          q: "Does it keep the first occurrence or the last?",
          a: "It keeps the first occurrence of each line and removes later repeats, preserving the original order unless you enable sorting.",
        },
        {
          q: "Can it ignore differences in capitalisation?",
          a: "Yes. Enable 'ignore case' to treat Apple and apple as the same line when removing duplicates.",
        },
      ],
    },
  },

  // ─────────────────────────────── Time & Random ───────────────────────────────
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers in a range.",
    tagline:
      "Generate random numbers in any range — unique or repeating — using cryptographically strong randomness.",
    category: "time",
    keywords: ["random", "number", "rng", "range", "lottery", "pick", "generate"],
    icon: "dice",
    popular: true,
    local: true,
    related: ["dice-roller", "coin-flip", "uuid-generator", "timer"],
    content: {
      what: "Generate one or more random whole numbers between a minimum and maximum you choose. Optionally require the numbers to be unique — perfect for raffles, lotteries and picking winners — using the browser's secure random source.",
      how: [
        "Set the minimum and maximum.",
        "Choose how many numbers to generate and whether they must be unique.",
        "Generate, then copy the result.",
      ],
      examples: [
        "Pick a number between 1 and 100",
        "Draw 6 unique numbers from 1–49 for a lottery line",
      ],
      faqs: [
        {
          q: "Is the randomness truly random?",
          a: "It uses the browser's cryptographically secure generator (crypto.getRandomValues), which is far stronger than the ordinary pseudo-random function and free of predictable bias.",
        },
        {
          q: "Can I generate numbers without repeats?",
          a: "Yes. Turn on 'unique' and each number in the batch will be different, as long as the range is large enough to supply them.",
        },
      ],
    },
  },
  {
    slug: "coin-flip",
    name: "Coin Flip",
    description: "Flip a fair virtual coin.",
    tagline:
      "Flip a fair coin for heads or tails, or flip many at once and see the running tally.",
    category: "time",
    keywords: ["coin", "flip", "heads", "tails", "decision", "50/50", "toss"],
    icon: "coin",
    local: true,
    related: ["dice-roller", "random-number-generator", "timer", "stopwatch"],
    content: {
      what: "A fair 50/50 coin flip for settling decisions. Flip once with a quick animation, or flip a batch of coins and see how many landed heads versus tails, with the running totals kept across flips.",
      how: [
        "Press Flip for a single heads-or-tails result.",
        "Or set a count and flip many coins at once.",
        "Watch the heads/tails tally build up over your session.",
      ],
      examples: [
        "Settle a decision with one flip",
        "Flip 100 coins and compare the split to 50/50",
      ],
      faqs: [
        {
          q: "Is the coin genuinely fair?",
          a: "Yes. Each flip has an exact 50% chance of heads and 50% of tails, drawn from the browser's secure random generator with no bias.",
        },
        {
          q: "Why isn't my batch exactly half heads?",
          a: "Real randomness clusters. A fair coin still lands, say, 46 heads out of 100 quite often — the split only approaches 50/50 over very large numbers of flips.",
        },
      ],
    },
  },
  {
    slug: "dice-roller",
    name: "Dice Roller",
    description: "Roll dice with any number of sides.",
    tagline:
      "Roll any number of dice with any number of sides — d6, d20 and beyond — with totals and modifiers.",
    category: "time",
    keywords: ["dice", "roll", "d20", "d6", "tabletop", "rpg", "dnd", "random"],
    icon: "dice",
    local: true,
    related: ["coin-flip", "random-number-generator", "timer", "stopwatch"],
    content: {
      what: "Roll virtual dice for board games and tabletop RPGs. Choose the number of sides (d4, d6, d8, d10, d12, d20 or a custom value), how many dice to roll, and an optional modifier added to the total. Each die's face and the sum are shown.",
      how: [
        "Pick the die type and how many to roll.",
        "Add a modifier if your game needs one.",
        "Roll and read each result plus the total.",
      ],
      examples: [
        "Roll 2d6 for a board game",
        "Roll a d20 + 5 for an attack in a tabletop RPG",
      ],
      faqs: [
        {
          q: "What does notation like 2d6+3 mean?",
          a: "It means roll two six-sided dice and add 3 to the total. The first number is how many dice, the number after 'd' is the sides, and the last is a modifier added to the sum.",
        },
        {
          q: "Are the rolls fair?",
          a: "Yes. Every face has an equal chance, using the browser's secure random generator, so there's no bias toward any number.",
        },
      ],
    },
  },
  {
    slug: "timer",
    name: "Online Timer",
    description: "A simple countdown timer.",
    tagline:
      "A clean, distraction-free countdown timer with quick presets and an alarm when time is up.",
    category: "time",
    keywords: ["timer", "countdown", "alarm", "minutes", "pomodoro", "cooking", "focus"],
    icon: "timer",
    popular: true,
    local: true,
    related: ["stopwatch", "coin-flip", "dice-roller", "random-number-generator"],
    content: {
      what: "A minimal countdown timer for focus sessions, cooking, workouts and breaks. Set a duration or tap a preset, then start. It counts down to zero and sounds an alarm — and keeps accurate time even if the tab is in the background.",
      how: [
        "Enter minutes and seconds, or tap a preset like 5m or 25m.",
        "Press Start; use Pause and Reset as needed.",
        "An alarm sounds when the timer reaches zero.",
      ],
      examples: [
        "25 minutes for a Pomodoro focus block",
        "10 minutes for a quick break or a boiling egg",
      ],
      faqs: [
        {
          q: "Does the timer keep running if I switch tabs?",
          a: "Yes. It tracks the real elapsed time rather than counting ticks, so it stays accurate even if the browser throttles the background tab.",
        },
        {
          q: "Will it make a sound when it finishes?",
          a: "Yes, it plays an alarm tone at zero. Make sure your device isn't muted; the first interaction with the page enables audio.",
        },
      ],
    },
  },
  {
    slug: "stopwatch",
    name: "Stopwatch",
    description: "Precise stopwatch with lap times.",
    tagline:
      "A precise stopwatch with lap and split times, accurate to hundredths of a second.",
    category: "time",
    keywords: ["stopwatch", "timer", "lap", "split", "elapsed", "chronometer", "measure time"],
    icon: "stopwatch",
    local: true,
    related: ["timer", "coin-flip", "dice-roller", "random-number-generator"],
    content: {
      what: "Measure elapsed time to a hundredth of a second, with lap and split recording. Start, stop and reset with keyboard-friendly controls; each lap shows both its own duration and the total time so far.",
      how: [
        "Press Start to begin timing.",
        "Press Lap to record a split without stopping the clock.",
        "Stop to pause and Reset to clear.",
      ],
      examples: [
        "Time laps around a track",
        "Measure how long a task actually takes",
      ],
      faqs: [
        {
          q: "How accurate is the stopwatch?",
          a: "It uses a high-resolution clock and measures the real elapsed time, so it stays accurate to hundredths of a second and doesn't drift while running.",
        },
        {
          q: "What is the difference between a lap and a split?",
          a: "A lap is the time for that individual segment; the split (or cumulative time) is the total elapsed since you started. Both are shown for each lap you record.",
        },
      ],
    },
  },
];

// ─────────────────────────────── Helpers ───────────────────────────────

export const toolBySlug: Record<string, Tool> = tools.reduce(
  (acc, t) => {
    acc[t.slug] = t;
    return acc;
  },
  {} as Record<string, Tool>,
);

export function getTool(slug: string): Tool | undefined {
  return toolBySlug[slug];
}

export function getToolsByCategory(category: CategoryId): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function popularTools(): Tool[] {
  return tools.filter((t) => t.popular);
}

export function relatedTools(slug: string): Tool[] {
  const tool = toolBySlug[slug];
  if (!tool) return [];
  return tool.related.map((s) => toolBySlug[s]).filter(Boolean);
}

export const allToolSlugs: string[] = tools.map((t) => t.slug);
