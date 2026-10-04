import { Course } from './types';

export const STATIC_COURSE_TRANSLATIONS: Record<string, Record<string, Partial<Course>>> = {
  en: {
    'course-fs': {
      title: 'Software Engineering & Full Stack Developer Program',
      description: 'From zero to Senior. Learn database architecture, robust APIs in Node.js, modern reactive interfaces in React, DevOps deployments, and latency optimization. Available in easy monthly installments.',
      difficulty: 'Intermediate',
      instructor: 'Academy Instructor',
      modules: [
        {
          title: 'Module 1: Modern Frontend & React 19',
          duration: '35 hours',
          topics: [
            {
              title: 'Virtual DOM, JSX, and Advanced Hooks',
              content: 'React uses a Virtual DOM to optimize UI updates. At this level, we will master key hooks like useState, useEffect, and the new React 19 use hook, avoiding infinite re-render loops.',
              codeSnippet: `import { useState, useEffect } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}`,
              quizQuestion: {
                question: 'Why should you not update state directly inside the body of a React component?',
                options: [
                  'Because it generates an instant compilation error in TypeScript.',
                  'Because it triggers infinite re-renders by evaluating state recursively.',
                  'Because it disables the browser garbage collector.'
                ],
                answerIndex: 1,
                explanation: 'Updating state in the component body triggers an immediate re-render, which executes the body again and updates the state again, creating an infinite loop.'
              }
            }
          ]
        },
        {
          title: 'Module 2: High-Performance Asynchronous Backend',
          duration: '45 hours',
          topics: [
            {
              title: 'Express, Middlewares, and Controllers',
              content: 'Node.js executes JavaScript on the server using a single-threaded asynchronous event loop. We will design clean REST controllers with implicit dependency injection and centralized exception handling.',
              codeSnippet: `import express from 'express';\nconst app = express();\n\napp.use(express.json());\n\napp.post('/api/v1/users', (req, res) => {\n  const { username } = req.body;\n  res.status(201).json({ status: 'user_created', username });\n});`,
              quizQuestion: {
                question: 'What is the primary advantage of Node.js single-threaded asynchronous architecture?',
                options: [
                  'Ease of executing CPU-intensive computing tasks in parallel.',
                  'High efficiency in Input/Output (I/O) operations without blocking system threads.',
                  'Eliminating the need to use relational databases.'
                ],
                answerIndex: 1,
                explanation: 'The event loop delegates I/O operations to the operating system, allowing a single thread to serve thousands of concurrent incoming connections efficiently.'
              }
            }
          ]
        }
      ]
    },
    'course-react': {
      title: 'Advanced Specialization in React 19 & Tailwind CSS',
      description: 'Master atomic user interface design, ultra-fast reactive state with Zustand, fluid hardware-accelerated animations, and render optimizations.',
      difficulty: 'Advanced',
      instructor: 'Academy Instructor',
      modules: [
        {
          title: 'Module 1: Tailwind CSS & Atomic Architecture',
          duration: '15 hours',
          topics: [
            {
              title: 'Reactive Layouts & CSS Optimization',
              content: 'Use the power of Tailwind to build design token systems without writing separate style sheets. Combine classes with utilities like cn() using clsx and tailwind-merge.',
              codeSnippet: `import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`,
              quizQuestion: {
                question: 'What is the main role of tailwind-merge in a React project?',
                options: [
                  'To convert TypeScript code into native CSS classes.',
                  'To merge Tailwind classes, resolving precedence conflicts automatically.',
                  'To inject global styles directly into the document head.'
                ],
                answerIndex: 1,
                explanation: 'tailwind-merge ensures that the last applied class correctly overrides previous classes (e.g., "bg-red-500 bg-blue-500" correctly resolves to "bg-blue-500").'
              }
            }
          ]
        },
        {
          title: 'Module 2: Minimalist State Managers with Zustand',
          duration: '25 hours',
          topics: [
            {
              title: 'Replacing Redux with Zustand',
              content: 'Zustand offers extremely fast global state management using native closures, without wrapping the application in a complex Context Provider.',
              codeSnippet: `import { create } from 'zustand';\n\ninterface CartStore {\n  itemsCount: number;\n  addItem: () => void;\n}\n\nexport const useCartStore = create<CartStore>((set) => ({\n  itemsCount: 0,\n  addItem: () => set((state) => ({ itemsCount: state.itemsCount + 1 })),\n}));`,
              quizQuestion: {
                question: 'Why does Zustand perform better than React Context by default?',
                options: [
                  'Because it stores state directly in the cloud.',
                  'Because it prevents components not subscribed to specific fields from re-rendering.',
                  'Because it auto-compiles JavaScript to WebAssembly code.'
                ],
                answerIndex: 1,
                explanation: 'Zustand allows selecting specific portions of the state using selectors. Components only re-render if the value returned by the selector changes.'
              }
            }
          ]
        }
      ]
    },
    'course-nodejs': {
      title: 'Professional Backend Development with Node.js & Express',
      description: 'Learn to build fast, secure microservices with automated validations, JWT authentication, bcrypt hashing, and cloud relational databases.',
      difficulty: 'Intermediate',
      instructor: 'Academy Instructor',
      modules: [
        {
          title: 'Module 1: Secure Authentication & JWT',
          duration: '20 hours',
          topics: [
            {
              title: 'Token Strategies & Header Security',
              content: 'JWT (JSON Web Tokens) allows stateless request authentication. Use HS256 cryptographic signatures and save tokens in httpOnly cookies to mitigate XSS attacks.',
              codeSnippet: `import jwt from 'jsonwebtoken';\n\nconst token = jwt.sign(\n  { userId: 'u123', email: 'user@domain.com' },\n  process.env.JWT_SECRET || 'secret',\n  { expiresIn: '2h' }\n);`,
              quizQuestion: {
                question: 'What is the main advantage of storing a JWT in an httpOnly cookie compared to localStorage?',
                options: [
                  'The token is automatically encrypted by the network card.',
                  'It prevents third-party JavaScript scripts from reading the token directly, protecting against XSS.',
                  'It enables gzip data compression by default.'
                ],
                answerIndex: 1,
                explanation: 'httpOnly cookies cannot be read by JavaScript API in the browser (document.cookie), reducing the possibility of token theft by injected malicious scripts.'
              }
            }
          ]
        }
      ]
    },
    'course-fintech': {
      title: 'University Postgraduate in FinTech Ledger, Banking Architecture & High-Availability Systems',
      description: 'Comprehensive 6-month advanced postgraduate program (₡35,000 monthly). Master the engineering behind high-availability core banking systems: cryptographic double-entry bookkeeping, millisecond SINPE reconciliation, event-driven architectures with Kafka, AML/KYC fraud prevention, dynamic credit risk scoring engines, and Open Banking under military-grade security standards.',
      difficulty: 'Advanced',
      instructor: 'Academy Instructor',
      modules: [
        {
          title: 'Module 1: Double-Entry Ledger & Cryptographic Consistency',
          duration: '30 hours',
          topics: [
            {
              title: 'Cryptographic Double-Entry Ledger',
              content: 'The double-entry principle requires that each transaction has a balanced sender and receiver. We will design an ultra-fast engine in Go with an isolated ACID relational database and optimistic concurrency guards.',
              codeSnippet: `// Secure Transaction Struct in Go\ntype Transaction struct {\n  ID        string    \`json:"id"\`\n  Sender    string    \`json:"sender_account"\`\n  Receiver  string    \`json:"receiver_account"\`\n  Amount    float64   \`json:"amount"\`\n  Hash      string    \`json:"cryptographic_hash"\`\n}`,
              quizQuestion: {
                question: 'Why is Double-Entry Bookkeeping used in banking FinTech systems?',
                options: [
                  'To randomly double the profits charged to customers.',
                  'To guarantee absolute mathematical consistency where the sum of debits equals credits.',
                  'To automatically convert transactions to cryptocurrencies.'
                ],
                answerIndex: 1,
                explanation: 'The double-entry system ensures that every financial change is recorded in at least two accounts, keeping the accounting equation balanced and facilitating strict audits.'
              }
            }
          ]
        },
        {
          title: 'Module 2: SINPE Móvil Reconciliation & Transaction API',
          duration: '30 hours',
          topics: [
            {
              title: 'Real-time synchronization and transactional webhook',
              content: 'Master asynchronous flow design to immediately capture and process SINPE Móvil receipts using message queues and transactional webhook triggers with TLS security signatures.',
              codeSnippet: `// Example of transactional Webhook signature validation\nimport crypto\n\nfunc VerifySignature(payload []byte, signature string, secret string) bool {\n    mac := hmac.New(sha256.New, []byte(secret))\n    mac.Write(payload)\n    expected := hex.EncodeToString(mac.Sum(nil))\n    return hmac.Equal([]byte(expected), []byte(signature))\n}`,
              quizQuestion: {
                question: 'How do FinTech webhooks mitigate Replay Attacks?',
                options: [
                  'By changing the Express server port number on each request.',
                  'By including a cryptographically signed timestamp in the webhook headers.',
                  'By removing HTTPS connections to speed up responses.'
                ],
                answerIndex: 1,
                explanation: 'Signed timestamps allow the server to verify that the message was generated just seconds ago and has not been intercepted and re-sent by an attacker.'
              }
            }
          ]
        },
        {
          title: 'Module 3: Distributed Microservices & Event-Driven Architectures (EDA)',
          duration: '30 hours',
          topics: [
            {
              title: 'Asynchronous Processing, Kafka, Event Sourcing, and Outbox Pattern',
              content: 'In financial microservice architectures, eventual consistency and resilience are paramount. Learn to implement the Transactional Outbox pattern to guarantee that transactional state changes and balances are published exactly-once to message brokers like Apache Kafka, avoiding ledger duplicate values or silent failures.',
              codeSnippet: `// Example of Transactional Event Publishing with Outbox Pattern\nconst dbTransaction = await pool.connect();\ntry {\n  await dbTransaction.query('BEGIN');\n  // 1. Insert transfer in main ledger table\n  await dbTransaction.query('INSERT INTO transfers ...');\n  // 2. Insert outbox event in same local atomic database transaction\n  await dbTransaction.query('INSERT INTO outbox_events (event_type, payload) VALUES ($1, $2)', ['TransferCreated', payload]);\n  await dbTransaction.query('COMMIT');\n} catch (e) {\n  await dbTransaction.query('ROLLBACK');\n}`,
              quizQuestion: {
                question: 'What critical distributed system issue does the Transactional Outbox Pattern solve?',
                options: [
                  'TCP compression speeds.',
                  'Guarantees atomic consistency between the relational database and the message broker so both succeed or both fail.',
                  'Allows hot microservices to share the same database without isolation.'
                ],
                answerIndex: 1,
                explanation: 'The Outbox pattern ensures database updates and message publication happen in a single local database atomic transaction, removing edge cases where database is updated but network fails before posting to Kafka.'
              }
            }
          ]
        },
        {
          title: 'Module 4: Banking Cybersecurity, Fraud Prevention (AML/KYC) & mTLS',
          duration: '30 hours',
          topics: [
            {
              title: 'mTLS, Heuristic Fraud Score, and International AML/CFT Standards',
              content: 'Connections between banks and payment gateways are heavily restricted. We will cover setting up Mutual TLS (mTLS) to validate both parties using X.509 trusted certificates. Additionally, we will design real-time transaction scoring systems to detect AML (Anti-Money Laundering) patterns.',
              codeSnippet: `// Heuristic Antifraud Risk Score\nfunction evaluateTransactionRisk(tx) {\n  let riskScore = 0;\n  if (tx.amount > 5000000) riskScore += 40;\n  if (tx.isInternational) riskScore += 20;\n  if (tx.timeBetweenTransactionsSec < 5) riskScore += 30;\n  return {\n    riskScore,\n    requiresManualReview: riskScore >= 70,\n    status: riskScore >= 70 ? 'BLOCKED_PENDING_AML' : 'APPROVED'\n  };\n}`,
              quizQuestion: {
                question: 'What is Mutual TLS (mTLS) authentication?',
                options: [
                  'An end-to-end encryption method that only encodes passwords in base64.',
                  'A network security protocol where both client and server authenticate each other using digital certificates before establishing a secure channel.',
                  'A single sign-on social authentication mechanism.'
                ],
                answerIndex: 1,
                explanation: 'Unlike standard TLS where only the client validates the server, in mTLS the server also requires a valid certificate from the client, ensuring only pre-authorized API consumers can invoke core functions.'
              }
            }
          ]
        },
        {
          title: 'Module 5: Credit Engines, Dynamic Risk Scoring & Financial Amortization',
          duration: '30 hours',
          topics: [
            {
              title: 'Credit Scoring Algorithms, Decision Matrices, and Compound Interest Fomulas',
              content: 'Build and tune a business rules engine for instant credit approval. We will implement scoring models that evaluate credit worthiness based on debt, verified income, and public registry scorecards. We will also construct French and German Amortization schedule generators to simulate loan installments.',
              codeSnippet: `// French Amortization Schedule Generator (Fixed installments)\nfunction generateFrenchAmortization(principal, annualRate, months) {\n  const monthlyRate = (annualRate / 100) / 12;\n  const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));\n  const schedule = [];\n  let balance = principal;\n  for (let i = 1; i <= months; i++) {\n    const interest = balance * monthlyRate;\n    const amortization = monthlyPayment - interest;\n    balance -= amortization;\n    schedule.push({ month: i, payment: monthlyPayment, interest, amortization, balance: Math.max(0, balance) });\n  }\n  return schedule;\n}`,
              quizQuestion: {
                question: 'What is the main characteristic of the French Amortization system?',
                options: [
                  'The total monthly installment remains constant throughout the loan term (interest decreases and capital repayment increases in each installment).',
                  'The amortized principal is constant in each installment, leading to a decreasing total payment.',
                  'No interest is charged and the entire principal is paid at maturity.'
                ],
                answerIndex: 0,
                explanation: 'The French system features fixed monthly installments. Early payments are heavily weighted towards interest, while later payments amortize the outstanding principal.'
              }
            }
          ]
        },
        {
          title: 'Module 6: Open Banking (PSD2), Asset Tokenization & ISO 20022',
          duration: '30 hours',
          topics: [
            {
              title: 'Open Banking APIs, Vaulted Balance Tokenization, and ISO 20022 Messaging',
              content: 'Study the European PSD2 directive and how to design open banking APIs that enable secure payment initiation and account aggregation. We will also analyze the ISO 20022 messaging schema and fundamentals of tokenized deposit settlement.',
              codeSnippet: `// Simplified ISO 20022 XML Message (pain.001.001.08) example\nconst iso20022Message = \`\n<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.08">\n  <CstmrCdtTrfInitn>\n    <GrpHdr>\n      <MsgId>ACAD-FINTECH-20260713-01</MsgId>\n      <CreDtTm>2026-07-13T00:30:00Z</CreDtTm>\n      <NbOfTxs>1</NbOfTxs>\n    </GrpHdr>\n    <Dbtr>\n      <Nm>FullStack Academy</Nm>\n    </Dbtr>\n  </CstmrCdtTrfInitn>\n</Document>\`;`,
              quizQuestion: {
                question: 'What is ISO 20022 and why is it being adopted globally in international banking?',
                options: [
                  'A compressed audio format for storing banking service calls.',
                  'A structured XML/JSON financial messaging standard that replaces legacy formats (SWIFT MT) with rich, high-quality, and structured metadata.',
                  'A debit card chip specification.'
                ],
                answerIndex: 1,
                explanation: 'The ISO 20022 standard allows worldwide financial systems to communicate with rich transaction metadata, enhancing automation, preventing wiring interpretation errors, and easing AML screening.'
              }
            }
          ]
        }
      ]
    },
    'course-ai': {
      title: 'Specialization in Artificial Intelligence & Agents with Gemini API',
      description: 'Learn to integrate state-of-the-art language models, design high-precision structured prompts, implement function calling, and orchestrate autonomous agents. Available in easy monthly installments.',
      difficulty: 'Intermediate',
      instructor: 'Academy Instructor',
      modules: [
        {
          title: 'Module 1: Prompt Engineering & Structured Outputs',
          duration: '15 hours',
          topics: [
            {
              title: 'Language Models, System Instructions, and JSON Format',
              content: 'LLMs operate by predicting the most probable token. We will learn to program inviolable System Instructions and force the model to respond with strict JSON schemas (Structured Outputs) for direct, reliable system integration.',
              codeSnippet: `import { GoogleGenAI, Type } from '@google/genai';\nconst ai = new GoogleGenAI();\n\nconst response = await ai.models.generateContent({\n  model: 'gemini-2.5-flash',\n  contents: 'List 3 programming languages with their year of creation',\n  config: {\n    responseMimeType: 'application/json',\n    responseSchema: {\n      type: Type.ARRAY,\n      items: {\n        type: Type.OBJECT,\n        properties: {\n          name: { type: Type.STRING },\n          year: { type: Type.INTEGER }\n        }\n      }\n    }\n  }\n});`,
              quizQuestion: {
                question: 'What is the primary benefit of defining a JSON schema (Structured Output) when calling an AI model?',
                options: [
                  'It allows the model to run directly in the client browser without a network connection.',
                  'It guarantees that the AI response will have a predictable format that our code can parse safely without breaking.',
                  'It accelerates the model response by multiplying its bandwidth.'
                ],
                answerIndex: 1,
                explanation: 'By defining a JSON schema (responseSchema), the LLM decoder restricts the output to match the exact required data structure, eliminating free-text responses that are difficult to parse.'
              }
            }
          ]
        },
        {
          title: 'Module 2: Agents and Tools (Function Calling)',
          duration: '25 hours',
          topics: [
            {
              title: 'Function Calling and Agent Orchestration',
              content: 'Agents interact with the real world using tools. We will learn to register native functions in the Gemini SDK so that the model autonomously decides when and with what parameters to execute them, creating smart workflows.',
              codeSnippet: `const getStockPrice = ({ ticker }) => ({ price: ticker === 'GOOG' ? 190.5 : 150.0 });\n\nconst response = await ai.models.generateContent({\n  model: 'gemini-2.5-flash',\n  contents: 'What is the stock price of GOOG?',\n  config: {\n    tools: [{ functionDeclarations: [{\n      name: 'getStockPrice',\n      parameters: { type: Type.OBJECT, properties: { ticker: { type: Type.STRING } } }\n    }]}]\n  }\n});`,
              quizQuestion: {
                question: 'What is "Function Calling" in the context of AI APIs?',
                options: [
                  'A technique for the AI to write TypeScript functions recursively.',
                  'A mechanism where the model autonomously decides which local function to call and with what arguments, returning execution instructions.',
                  'A way to optimize server database RAM consumption.'
                ],
                answerIndex: 1,
                explanation: 'Function Calling allows the model to analyze the user request, detect if it needs to use a tool, and return a structured object indicating the function name and optimal arguments to execute it.'
              }
            }
          ]
        }
      ]
    },
    'course-cybersecurity': {
      title: 'Professional Specialization in Cybersecurity & Pentesting',
      description: 'Learn to audit web applications under OWASP Top 10 standards, implement robust cryptographic systems, understand exploits, and secure cloud architectures.',
      difficulty: 'Advanced',
      instructor: 'Academy Instructor',
      modules: [
        {
          title: 'Module 1: Web Security & Vulnerability Mitigation',
          duration: '20 hours',
          topics: [
            {
              title: 'SQL Injections (SQLi) & XSS Attacks',
              content: 'Code injections occur when unsanitized data is interpreted as execution commands. We will learn to audit classic web vulnerabilities, implement parameterized prepared queries, and configure strict Content Security Policies (CSP).',
              codeSnippet: `// Secure query using Parameterized SQL to avoid SQLi\nconst query = 'SELECT * FROM users WHERE email = $1 AND password_hash = $2';\nconst values = [userInputEmail, hashedUserPassword];\nconst result = await db.query(query, values);`,
              quizQuestion: {
                question: 'How do prepared statements mitigate the risk of SQL Injection?',
                options: [
                  'By encrypting the application source code on the server.',
                  'By treating user inputs strictly as isolated parameters of the SQL engine, never interpreting them as executable commands.',
                  'By preventing users from using special characters in their passwords.'
                ],
                answerIndex: 1,
                explanation: 'Prepared statements pre-compile the SQL structure. When user parameters enter, they are inserted directly into the specified positions as pure data, making it impossible to alter the original query logic.'
              }
            }
          ]
        },
        {
          title: 'Module 2: Practical Cryptography & Hardening',
          duration: '25 hours',
          topics: [
            {
              title: 'Password Hashing & Secrets Management',
              content: 'Passwords must never be stored in plain text. We will use the adaptive key derivation algorithm Argon2id or bcrypt with dynamic salting to resist brute force attacks and Rainbow Tables.',
              codeSnippet: `import bcrypt from 'bcrypt';\n\nconst password = 'UserSecurePassword123!';\nconst saltRounds = 12;\nconst hash = await bcrypt.hash(password, saltRounds);\n\n// Verification\nconst isMatch = await bcrypt.compare(password, hash);`,
              quizQuestion: {
                question: 'What role does "salt" play when hashing a password?',
                options: [
                  'It makes the password readable in case the IT administrator needs it.',
                  'It adds a unique random value to the password before hashing it to ensure that two identical passwords produce different hashes, preventing Rainbow Table attacks.',
                  'It speeds up hash calculation, decreasing CPU consumption.'
                ],
                answerIndex: 1,
                explanation: 'Salt is a unique random fragment for each user. When combined with the password before hashing, it prevents attackers from using precomputed hash tables (Rainbow Tables) to crack common passwords.'
              }
            }
          ]
        }
      ]
    },
    'course-english': {
      title: 'Professional and Business English Specialization',
      description: 'Master the global language of technology and business. From core corporate communication fundamentals to technical interview prep, professional email writing, and high-impact daily standups.',
      difficulty: 'Intermediate',
      instructor: 'Academy Instructor',
      modules: [
        {
          title: 'Module 1: Business and Written Correspondence (Emails & Slack)',
          duration: '16 hours',
          topics: [
            {
              title: 'Structuring Professional Emails & Work Messaging',
              content: 'Learn formal and informal patterns for business writing in English. We will cover email templates, greeting formulas, requesting project updates, follow-ups, and polite sign-offs.',
              codeSnippet: `// Useful templates for Slack & Email:\n// 1. Project Update:\n"Hi team, just a quick update on the latest deployment: everything is live on production and latency is stable. Let me know if you encounter any issues!"\n\n// 2. Requesting Help:\n"Hi [Name], hope you are well. Could you please review the API endpoint schema when you have a moment? I want to ensure we align on the database keys. Thanks!"`,
              quizQuestion: {
                question: 'What is the most professional and common way to politely request a review in a technology work environment?',
                options: [
                  '"Hey! Do my review now, please."',
                  '"Could you please review the API endpoint schema when you have a moment? Thanks!"',
                  '"Review this code for me, I have no time."'
                ],
                answerIndex: 1,
                explanation: 'Using polite expressions like "Could you please..." and "when you have a moment" maintains a professional, respectful, and collaborative team tone.'
              }
            }
          ]
        },
        {
          title: 'Module 2: Technical Interviews & Daily Standups',
          duration: '16 hours',
          topics: [
            {
              title: 'Mastering the Daily Standup and Code Explanations',
              content: 'Daily standups require conciseness and clarity. Learn to structure your updates using three pillars: what was completed yesterday, what you plan to do today, and whether you have any blockers.',
              codeSnippet: `// Daily Standup Template:\nconst dailyStandup = {\n  yesterday: "Yesterday, I resolved the state re-rendering bug and updated the courses database schema.",\n  today: "Today, I am going to implement the English and Mathematics modules and write their translations.",\n  blockers: "I have no blockers at the moment. Everything is running smoothly."\n};`,
              quizQuestion: {
                question: 'What three key components make up a professional Daily Standup report in English?',
                options: [
                  'Your current salary, server complaints, and vacation plans.',
                  'What you did yesterday, what you plan to do today, and whether you have any blockers.',
                  'A line-by-line detailed explanation of every code line written in the month.'
                ],
                answerIndex: 1,
                explanation: 'The standard Daily Standup structure is concise and focuses on daily progress: Yesterday (Past), Today (Present/Future), and Blockers (Impediments).'
              }
            }
          ]
        }
      ]
    },
    'course-math6': {
      title: 'Comprehensive Mathematics Preparation • 6th Grade Primary',
      description: 'The ultimate mathematics preparation course for sixth-grade students. Step-by-step explanations, interactive practices, fractions, decimals, ratios, proportions, basic geometry, and algebra fundamentals.',
      difficulty: 'Beginner',
      instructor: 'Academy Instructor',
      modules: [
        {
          title: 'Module 1: Operations with Fractions and Decimals Step-by-Step',
          duration: '18 hours',
          topics: [
            {
              title: 'Adding and Subtracting Fractions with Different Denominators (Least Common Multiple)',
              content: 'To add or subtract fractions with different denominators, we must find a common denominator by calculating the Least Common Multiple (LCM). \n\n**Step 1:** Identify denominators. E.g., for 1/4 + 1/6, the denominators are 4 and 6.\n**Step 2:** Calculate LCM of 4 and 6 (which is 12).\n**Step 3:** Convert each fraction to its equivalent with denominator 12: \n* 1/4 multiplied by 3/3 = 3/12 \n* 1/6 multiplied by 2/2 = 2/12\n**Step 4:** Add the numerators: 3/12 + 2/12 = 5/12.',
              codeSnippet: `// Step-by-step mathematical resolution in interactive code:\nfunction addFractions(num1, den1, num2, den2) {\n  const lcm = 12; // Least Common Multiple of 4 and 6\n  const newNum1 = num1 * (lcm / den1);             // 1 * (12/4) = 3\n  const newNum2 = num2 * (mcm / den2);             // 1 * (12/6) = 2\n  const numResult = newNum1 + newNum2;             // 3 + 2 = 5\n  return \`Sum result: \${numResult}/\${lcm}\`;         // "5/12"\n}`,
              quizQuestion: {
                question: 'What is the simplified result of adding 1/3 + 1/6?',
                options: [
                  '2/9',
                  '1/2 (which equals 3/6)',
                  '2/6'
                ],
                answerIndex: 1,
                explanation: 'The LCM of 3 and 6 is 6. We convert 1/3 to 2/6. Then we add 2/6 + 1/6 = 3/6. Simplifying 3/6 by dividing the numerator and denominator by 3 gives 1/2.'
              }
            }
          ]
        },
        {
          title: 'Module 2: Ratios, Proportions, and the Rule of Three',
          duration: '18 hours',
          topics: [
            {
              title: 'Solving Problems using the Simple Rule of Three',
              content: 'The Rule of Three is an indispensable mathematical tool to solve direct proportionality problems. \n\n**Practical Example:** If 3 notebooks cost ₡4,500, how much will 7 notebooks cost? \n\n**Step-by-Step:**\n1. Align variables: \n   * 3 notebooks ---> ₡4,500\n   * 7 notebooks ---> X\n2. Cross multiply: multiply the two diagonal known values: 7 * 4,500 = 31,500.\n3. Divide by the remaining value: divide the result by the third number: 31,500 / 3 = 10,500.\n\nTherefore, 7 notebooks cost ₡10,500!',
              codeSnippet: `// Simple Direct Rule of Three Algorithm:\n// If A notebooks give B colones, how much do C notebooks give?\nconst calculateRuleOfThree = (a, b, c) => {\n  const result = (c * b) / a;\n  return result;\n};\n\n// Example: A = 3 notebooks, B = 4500, C = 7 notebooks\nconst sevenNotebooksPrice = calculateRuleOfThree(3, 4500, 7); // Returns 10500`,
              quizQuestion: {
                question: 'If a car travels 180 kilometers in 2 hours at constant speed, how many kilometers will it travel in 5 hours?',
                options: [
                  '360 kilometers',
                  '450 kilometers',
                  '500 kilometers'
                ],
                answerIndex: 1,
                explanation: 'We apply the Rule of Three: 2 hours -> 180 km, so 5 hours -> X. Cross multiply: 5 * 180 = 900. Divide by 2: 900 / 2 = 450 km.'
              }
            }
          ]
        }
      ]
    }
  },
  pt: {
    'course-fs': {
      title: 'Programa de Engenharia de Software & Full Stack Developer',
      description: 'Do zero ao Sênior. Aprenda arquitetura de bancos de dados, APIs robustas em Node.js, interfaces reativas em React, implantação DevOps e otimização de latência. Disponível em mensalidades acessíveis.',
      difficulty: 'Intermediário',
      instructor: 'Instrutora da Academia',
      modules: [
        {
          title: 'Módulo 1: Frontend Moderno e React 19',
          duration: '35 horas',
          topics: [
            {
              title: 'Virtual DOM, JSX e Hooks Avançados',
              content: 'O React usa um Virtual DOM para otimizar as atualizações de UI. Dominaremos hooks essenciais como useState, useEffect e o novo hook use do React 19, evitando loops infinitos de re-render.',
              codeSnippet: `import { useState, useEffect } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}`,
              quizQuestion: {
                question: 'Por que você não deve atualizar o estado diretamente no corpo de um componente React?',
                options: [
                  'Porque gera um erro de compilação instantâneo no TypeScript.',
                  'Porque causa loops de re-render infinitos ao avaliar o estado recursivamente.',
                  'Porque desativa o coletor de lixo do navegador.'
                ],
                answerIndex: 1,
                explanation: 'Atualizar o estado no corpo do componente dispara um re-render imediato, que executa o corpo novamente e atualiza o estado de novo, criando um loop infinito.'
              }
            }
          ]
        }
      ]
    },
    'course-fintech': {
      title: 'Pós-Graduação Universitária em FinTech Ledger, Arquitetura Bancária & Sistemas de Alta Disponibilidade',
      description: 'Pós-graduação avançada completa de 6 meses. Aprenda a construir ledger cores financeiros de alta disponibilidade, reconciliação de transações em milissegundos, arquitetura de eventos com Kafka, prevenção de fraudes e Open Banking.',
      difficulty: 'Avançado',
      instructor: 'Instrutora da Academia'
    }
  },
  fr: {
    'course-fs': {
      title: 'Programme d\'Ingénierie Logicielle & Développeur Full Stack',
      description: 'De zéro à Senior. Apprenez l\'architecture des bases de données, les API robustes en Node.js, les interfaces réactives en React, les déploiements DevOps et l\'optimisation de la latence.',
      difficulty: 'Intermédiaire',
      instructor: 'Instructeur de l\'Académie',
      modules: [
        {
          title: 'Module 1: Frontend Moderne & React 19',
          duration: '35 heures',
          topics: [
            {
              title: 'Virtual DOM, JSX, et Hooks Avancés',
              content: 'React utilise un Virtual DOM pour optimiser les mises à jour de l\'interface. Nous maîtriserons les hooks clés comme useState, useEffect et le nouveau hook use de React 19.',
              codeSnippet: `import { useState, useEffect } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}`,
              quizQuestion: {
                question: 'Pourquoi ne faut-il pas mettre à jour l\'état directement dans le corps d\'un composant React ?',
                options: [
                  'Parce que cela génère une erreur de compilation TypeScript.',
                  'Parce que cela provoque des rendus infinis en évaluant l\'état de manière récursive.',
                  'Parce que cela désactive le ramasse-miettes du navigateur.'
                ],
                answerIndex: 1,
                explanation: 'La mise à jour de l\'état dans le corps déclenche un rendu immédiat, qui réexécute le corps et met à jour à nouveau l\'état, créant une boucle infinie.'
              }
            }
          ]
        }
      ]
    },
    'course-fintech': {
      title: 'Postgrade Universitaire en FinTech Ledger, Architecture Bancaire & Systèmes de Haute Disponibilité',
      description: 'Programme postgrade universitaire complet de 6 mois. Apprenez à concevoir des cœurs de grand livre financier hautement disponibles, la réconciliation de SINPE en millisecondes, l\'architecture d\'événements avec Kafka et l\'Open Banking.',
      difficulty: 'Avancé',
      instructor: 'Instructeur de l\'Académie'
    }
  },
  de: {
    'course-fs': {
      title: 'Software-Engineering & Full-Stack-Entwicklerprogramm',
      description: 'Von Null auf Senior. Lernen Sie Datenbankarchitektur, robuste APIs in Node.js, reaktive Schnittstellen in React, DevOps-Deployments und Latenzoptimierung.',
      difficulty: 'Mittel',
      instructor: 'Dozent der Akademie',
      modules: [
        {
          title: 'Modul 1: Modernes Frontend & React 19',
          duration: '35 Stunden',
          topics: [
            {
              title: 'Virtual DOM, JSX und fortgeschrittene Hooks',
              content: 'React verwendet ein Virtual DOM, um UI-Updates zu optimieren. In dieser Lektion meistern wir wichtige Hooks wie useState, useEffect und den neuen use-Hook von React 19.',
              codeSnippet: `import { useState, useEffect } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}`,
              quizQuestion: {
                question: 'Warum sollte man den Zustand nicht direkt im Rumpf einer React-Komponente aktualisieren?',
                options: [
                  'Weil es einen sofortigen TypeScript-Kompilierungsfehler erzeugt.',
                  'Weil es endlose Re-Renders auslöst, indem es den Zustand rekursiv auswertet.',
                  'Weil es den Garbage Collector des Browsers deaktiviert.'
                ],
                answerIndex: 1,
                explanation: 'Die Aktualisierung des Zustands im Rumpf löst ein sofortiges Re-Rendering aus, was den Rumpf erneut ausführt und den Zustand erneut aktualisiert, was zu einer Endlosschleife führt.'
              }
            }
          ]
        }
      ]
    },
    'course-fintech': {
      title: 'Universitärer Postgradualer Studiengang in FinTech Ledger, Banking-Architektur & Hochverfügbare Systeme',
      description: 'Umfassendes 6-monatiges postgraduales Studium. Lernen Sie den Aufbau hochverfügbarer Finanz-Hauptbücher, die SINPE-Abstimmung in Millisekunden, Event-Driven Architecture mit Kafka und Open Banking.',
      difficulty: 'Fortgeschritten',
      instructor: 'Dozent der Akademie'
    }
  }
};
