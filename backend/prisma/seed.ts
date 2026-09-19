import {
  ClassificationStatus,
  FeedbackChannel,
  FeedbackStatus,
  PrismaClient,
  Role,
  Sentiment,
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DEMO_WORKSPACE_SLUG = "loop-demo";
const DEMO_PASSWORD = "Demo@123";

const themeDefinitions = [
  {
    name: "Performance",
    description: "Slow loading, lag, freezing, and general performance issues.",
    color: "#EF4444",
  },
  {
    name: "Authentication",
    description: "Login, signup, password reset, and account access issues.",
    color: "#F97316",
  },
  {
    name: "Payments",
    description: "Payment failures, refunds, billing, and checkout concerns.",
    color: "#EAB308",
  },
  {
    name: "User Interface",
    description: "Layout, navigation, design, and usability feedback.",
    color: "#84CC16",
  },
  {
    name: "Mobile Experience",
    description: "Feedback related to the mobile application experience.",
    color: "#22C55E",
  },
  {
    name: "Notifications",
    description: "Email, push, and in-app notification feedback.",
    color: "#14B8A6",
  },
  {
    name: "Customer Support",
    description: "Support response time and service quality.",
    color: "#06B6D4",
  },
  {
    name: "Onboarding",
    description: "Account setup and first-time-user experience.",
    color: "#0EA5E9",
  },
  {
    name: "Search",
    description: "Search accuracy, speed, and filtering concerns.",
    color: "#3B82F6",
  },
  {
    name: "Integrations",
    description:
      "Third-party tools, imports, exports, and integration requests.",
    color: "#6366F1",
  },
  {
    name: "Reporting",
    description: "Dashboards, analytics, reports, and exports.",
    color: "#8B5CF6",
  },
  {
    name: "Security",
    description:
      "Privacy, permissions, account security, and suspicious activity.",
    color: "#A855F7",
  },
  {
    name: "Feature Request",
    description: "Requests for new product capabilities.",
    color: "#D946EF",
  },
  {
    name: "Reliability",
    description:
      "Crashes, errors, downtime, and unexpected application behaviour.",
    color: "#EC4899",
  },
  {
    name: "Documentation",
    description: "Help articles, instructions, and product documentation.",
    color: "#F43F5E",
  },
];

type FeedbackTemplate = {
  content: string;
  theme: string;
  featureArea: string;
  sentiment: Sentiment;
  scoreRange: [number, number];
};

const feedbackTemplates: FeedbackTemplate[] = [
  {
    content:
      "The dashboard takes too long to load whenever I select a larger date range.",
    theme: "Performance",
    featureArea: "Analytics dashboard",
    sentiment: Sentiment.NEG,
    scoreRange: [-0.95, -0.55],
  },
  {
    content:
      "The application feels much faster after the latest update. Great improvement.",
    theme: "Performance",
    featureArea: "Application performance",
    sentiment: Sentiment.POS,
    scoreRange: [0.55, 0.95],
  },
  {
    content:
      "I keep getting logged out even though I selected the remember-me option.",
    theme: "Authentication",
    featureArea: "Session management",
    sentiment: Sentiment.NEG,
    scoreRange: [-0.95, -0.55],
  },
  {
    content:
      "The password reset process was simple and I regained access quickly.",
    theme: "Authentication",
    featureArea: "Password recovery",
    sentiment: Sentiment.POS,
    scoreRange: [0.55, 0.95],
  },
  {
    content: "My payment was deducted, but the order still appears as unpaid.",
    theme: "Payments",
    featureArea: "Checkout",
    sentiment: Sentiment.NEG,
    scoreRange: [-1, -0.65],
  },
  {
    content:
      "The refund was processed earlier than expected. I appreciate the quick service.",
    theme: "Payments",
    featureArea: "Refunds",
    sentiment: Sentiment.POS,
    scoreRange: [0.6, 1],
  },
  {
    content:
      "The sidebar is difficult to understand and important pages are hard to find.",
    theme: "User Interface",
    featureArea: "Navigation",
    sentiment: Sentiment.NEG,
    scoreRange: [-0.9, -0.45],
  },
  {
    content: "The redesigned interface is clean and much easier to navigate.",
    theme: "User Interface",
    featureArea: "Navigation",
    sentiment: Sentiment.POS,
    scoreRange: [0.55, 0.95],
  },
  {
    content: "The mobile app freezes when I try to upload an attachment.",
    theme: "Mobile Experience",
    featureArea: "File upload",
    sentiment: Sentiment.NEG,
    scoreRange: [-0.95, -0.6],
  },
  {
    content:
      "The mobile layout works well on my phone and all controls are easy to use.",
    theme: "Mobile Experience",
    featureArea: "Responsive layout",
    sentiment: Sentiment.POS,
    scoreRange: [0.55, 0.95],
  },
  {
    content:
      "I receive the same notification multiple times for a single update.",
    theme: "Notifications",
    featureArea: "Push notifications",
    sentiment: Sentiment.NEG,
    scoreRange: [-0.9, -0.5],
  },
  {
    content:
      "It would be useful to choose which notifications are sent by email.",
    theme: "Notifications",
    featureArea: "Notification preferences",
    sentiment: Sentiment.NEU,
    scoreRange: [-0.15, 0.15],
  },
  {
    content:
      "Support took three days to respond and the issue is still unresolved.",
    theme: "Customer Support",
    featureArea: "Support response",
    sentiment: Sentiment.NEG,
    scoreRange: [-1, -0.65],
  },
  {
    content:
      "The support agent understood the issue and resolved it in one conversation.",
    theme: "Customer Support",
    featureArea: "Support quality",
    sentiment: Sentiment.POS,
    scoreRange: [0.65, 1],
  },
  {
    content:
      "The onboarding checklist helped our team configure the workspace quickly.",
    theme: "Onboarding",
    featureArea: "Getting started",
    sentiment: Sentiment.POS,
    scoreRange: [0.55, 0.95],
  },
  {
    content:
      "The setup instructions assume too much prior knowledge and need clearer steps.",
    theme: "Onboarding",
    featureArea: "Getting started",
    sentiment: Sentiment.NEG,
    scoreRange: [-0.85, -0.4],
  },
  {
    content:
      "Search does not return relevant results when I use multiple keywords.",
    theme: "Search",
    featureArea: "Global search",
    sentiment: Sentiment.NEG,
    scoreRange: [-0.9, -0.45],
  },
  {
    content: "The new filters make it much easier to locate older records.",
    theme: "Search",
    featureArea: "Search filters",
    sentiment: Sentiment.POS,
    scoreRange: [0.5, 0.9],
  },
  {
    content: "Please add an integration with our project-management tool.",
    theme: "Integrations",
    featureArea: "Third-party integrations",
    sentiment: Sentiment.NEU,
    scoreRange: [-0.1, 0.2],
  },
  {
    content: "CSV import worked correctly and saved us a lot of manual work.",
    theme: "Integrations",
    featureArea: "CSV import",
    sentiment: Sentiment.POS,
    scoreRange: [0.55, 0.95],
  },
  {
    content: "The exported report is missing the selected date range.",
    theme: "Reporting",
    featureArea: "Report export",
    sentiment: Sentiment.NEG,
    scoreRange: [-0.9, -0.5],
  },
  {
    content:
      "The analytics charts give our team a clear view of customer sentiment.",
    theme: "Reporting",
    featureArea: "Analytics",
    sentiment: Sentiment.POS,
    scoreRange: [0.6, 1],
  },
  {
    content: "We need more control over what viewers are allowed to access.",
    theme: "Security",
    featureArea: "Role permissions",
    sentiment: Sentiment.NEU,
    scoreRange: [-0.15, 0.15],
  },
  {
    content:
      "I received a login alert immediately after an unfamiliar sign-in attempt.",
    theme: "Security",
    featureArea: "Login security",
    sentiment: Sentiment.POS,
    scoreRange: [0.55, 0.95],
  },
  {
    content:
      "Please add scheduled reports that can be generated automatically every week.",
    theme: "Feature Request",
    featureArea: "Scheduled reports",
    sentiment: Sentiment.NEU,
    scoreRange: [-0.1, 0.2],
  },
  {
    content:
      "A dark mode option would make the application more comfortable at night.",
    theme: "Feature Request",
    featureArea: "Appearance",
    sentiment: Sentiment.NEU,
    scoreRange: [-0.1, 0.2],
  },
  {
    content:
      "The page crashes whenever I try to open a feedback item with an attachment.",
    theme: "Reliability",
    featureArea: "Feedback details",
    sentiment: Sentiment.NEG,
    scoreRange: [-1, -0.7],
  },
  {
    content:
      "The service has been stable throughout the week with no noticeable downtime.",
    theme: "Reliability",
    featureArea: "Platform availability",
    sentiment: Sentiment.POS,
    scoreRange: [0.6, 1],
  },
  {
    content:
      "The documentation does not explain how workspace permissions are inherited.",
    theme: "Documentation",
    featureArea: "Permissions documentation",
    sentiment: Sentiment.NEG,
    scoreRange: [-0.75, -0.35],
  },
  {
    content:
      "The API examples in the documentation were clear and easy to follow.",
    theme: "Documentation",
    featureArea: "API documentation",
    sentiment: Sentiment.POS,
    scoreRange: [0.55, 0.95],
  },
];

const channels: FeedbackChannel[] = [
  FeedbackChannel.MANUAL,
  FeedbackChannel.CSV_IMPORT,
  FeedbackChannel.SUPPORT,
  FeedbackChannel.EMAIL,
  FeedbackChannel.SURVEY,
  FeedbackChannel.APP_STORE,
  FeedbackChannel.PLAY_STORE,
  FeedbackChannel.SOCIAL_MEDIA,
  FeedbackChannel.SALES_NOTE,
];

const statuses: FeedbackStatus[] = [
  FeedbackStatus.NEW,
  FeedbackStatus.REVIEWED,
  FeedbackStatus.ACTIONED,
];

function randomScore([minimum, maximum]: [number, number]): number {
  return Number(
    faker.number
      .float({
        min: minimum,
        max: maximum,
        fractionDigits: 2,
      })
      .toFixed(2),
  );
}

async function resetDemoWorkspaceData(workspaceId: string): Promise<void> {
  /*
   * Reports must be deleted before users because Report.generatedBy uses
   * onDelete: Restrict.
   */
  await prisma.report.deleteMany({
    where: { workspaceId },
  });

  await prisma.feedbackTheme.deleteMany({
    where: {
      feedback: {
        workspaceId,
      },
    },
  });

  await prisma.embedding.deleteMany({
    where: {
      feedback: {
        workspaceId,
      },
    },
  });

  await prisma.feedback.deleteMany({
    where: { workspaceId },
  });

  await prisma.theme.deleteMany({
    where: { workspaceId },
  });

  await prisma.user.deleteMany({
    where: { workspaceId },
  });
}

async function main(): Promise<void> {
  console.log("Starting database seed...");

  faker.seed(2026);

  const workspace = await prisma.workspace.upsert({
    where: {
      slug: DEMO_WORKSPACE_SLUG,
    },
    update: {
      name: "LOOP Demo Workspace",
      deletedAt: null,
    },
    create: {
      name: "LOOP Demo Workspace",
      slug: DEMO_WORKSPACE_SLUG,
    },
  });

  await resetDemoWorkspaceData(workspace.id);

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);

  const admin = await prisma.user.create({
    data: {
      name: "Demo Admin",
      email: "admin@loop-demo.com",
      passwordHash,
      role: Role.ADMIN,
      workspaceId: workspace.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Demo Analyst",
      email: "analyst@loop-demo.com",
      passwordHash,
      role: Role.ANALYST,
      workspaceId: workspace.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Demo Viewer",
      email: "viewer@loop-demo.com",
      passwordHash,
      role: Role.VIEWER,
      workspaceId: workspace.id,
    },
  });

  console.log("Created demo workspace and users.");

  const themeMap = new Map<string, string>();

  for (const definition of themeDefinitions) {
    const theme = await prisma.theme.create({
      data: {
        ...definition,
        workspaceId: workspace.id,
      },
    });

    themeMap.set(theme.name, theme.id);
  }

  console.log(`Created ${themeMap.size} themes.`);

  const feedbackCount = 130;

  for (let index = 0; index < feedbackCount; index += 1) {
    const template = faker.helpers.arrayElement(feedbackTemplates);
    const channel = faker.helpers.arrayElement(channels);
    const status = faker.helpers.weightedArrayElement([
      { value: FeedbackStatus.NEW, weight: 5 },
      { value: FeedbackStatus.REVIEWED, weight: 3 },
      { value: FeedbackStatus.ACTIONED, weight: 2 },
    ]);

    const createdAt = faker.date.between({
      from: new Date("2026-04-01T00:00:00.000Z"),
      to: new Date("2026-07-26T00:00:00.000Z"),
    });

    const themeId = themeMap.get(template.theme);

    if (!themeId) {
      throw new Error(`Theme not found: ${template.theme}`);
    }

    const feedback = await prisma.feedback.create({
      data: {
        content: template.content,
        channel,
        sourceRef: `${channel.toLowerCase()}-${faker.string.alphanumeric({
          length: 10,
          casing: "lower",
        })}`,
        customerLabel: faker.person.fullName(),
        sentiment: template.sentiment,
        sentimentScore: randomScore(template.scoreRange),
        featureArea: template.featureArea,
        classificationRationale: `The feedback was classified under ${template.theme} based on its reference to ${template.featureArea.toLowerCase()}.`,
        classificationStatus: ClassificationStatus.COMPLETED,
        status,
        workspaceId: workspace.id,
        createdAt,
        updatedAt: createdAt,
      },
    });

    await prisma.feedbackTheme.create({
      data: {
        feedbackId: feedback.id,
        themeId,
        confidence: faker.number.float({
          min: 0.72,
          max: 0.99,
          fractionDigits: 2,
        }),
      },
    });

    /*
     * Around 20% of feedback receives a second related theme so that the
     * many-to-many relationship can be demonstrated.
     */
    if (faker.number.int({ min: 1, max: 100 }) <= 20) {
      const secondTheme = faker.helpers.arrayElement(
        themeDefinitions.filter(
          (definition) => definition.name !== template.theme,
        ),
      );

      const secondThemeId = themeMap.get(secondTheme.name);

      if (secondThemeId) {
        await prisma.feedbackTheme.create({
          data: {
            feedbackId: feedback.id,
            themeId: secondThemeId,
            confidence: faker.number.float({
              min: 0.5,
              max: 0.75,
              fractionDigits: 2,
            }),
          },
        });
      }
    }
  }

  console.log(`Created ${feedbackCount} feedback records.`);

  const reportContent = {
    summary:
      "Customer feedback was primarily concentrated around performance, reliability, payments, and navigation.",
    topThemes: [
      {
        name: "Performance",
        observation:
          "Customers reported slow dashboard loading for larger date ranges.",
      },
      {
        name: "Reliability",
        observation:
          "Attachment-related crashes appeared repeatedly in negative feedback.",
      },
      {
        name: "Payments",
        observation:
          "Payment status and refund experiences produced mixed sentiment.",
      },
    ],
    sentimentSummary: {
      positive:
        "Customers appreciated faster performance, helpful support, and improved navigation.",
      negative:
        "The main concerns involved crashes, payment status, and delayed support.",
      neutral:
        "Several customers requested integrations, scheduled reports, and appearance settings.",
    },
    recommendedActions: [
      "Investigate attachment-related crashes.",
      "Improve dashboard performance for larger date ranges.",
      "Review payment status synchronisation.",
      "Add clearer notification and role-permission settings.",
    ],
  };

  await prisma.report.create({
    data: {
      title: "Weekly Voice-of-Customer Report",
      periodStart: new Date("2026-07-13T00:00:00.000Z"),
      periodEnd: new Date("2026-07-20T23:59:59.999Z"),
      contentJson: reportContent,
      workspaceId: workspace.id,
      generatedBy: admin.id,
    },
  });

  await prisma.report.create({
    data: {
      title: "Monthly Customer Feedback Summary",
      periodStart: new Date("2026-06-01T00:00:00.000Z"),
      periodEnd: new Date("2026-06-30T23:59:59.999Z"),
      contentJson: reportContent,
      workspaceId: workspace.id,
      generatedBy: admin.id,
    },
  });

  console.log("Created sample reports.");

  const totals = await Promise.all([
    prisma.user.count({
      where: { workspaceId: workspace.id },
    }),
    prisma.theme.count({
      where: { workspaceId: workspace.id },
    }),
    prisma.feedback.count({
      where: { workspaceId: workspace.id },
    }),
    prisma.feedbackTheme.count({
      where: {
        feedback: {
          workspaceId: workspace.id,
        },
      },
    }),
    prisma.report.count({
      where: { workspaceId: workspace.id },
    }),
  ]);

  console.log("\nSeed completed successfully.");
  console.log("--------------------------------");
  console.log(`Workspace: ${workspace.name}`);
  console.log(`Users: ${totals[0]}`);
  console.log(`Themes: ${totals[1]}`);
  console.log(`Feedback: ${totals[2]}`);
  console.log(`Feedback-theme links: ${totals[3]}`);
  console.log(`Reports: ${totals[4]}`);

  console.log("\nDemo credentials:");
  console.log(`ADMIN: admin@loop-demo.com / ${DEMO_PASSWORD}`);
  console.log(`ANALYST: analyst@loop-demo.com / ${DEMO_PASSWORD}`);
  console.log(`VIEWER: viewer@loop-demo.com / ${DEMO_PASSWORD}`);
}

main()
  .catch((error: unknown) => {
    console.error("Database seed failed:");

    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
    } else {
      console.error(error);
    }

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
