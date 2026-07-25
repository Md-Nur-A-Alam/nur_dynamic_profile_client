export const collectionSchemas = {
  "profile": [
    {
      "name": "fullName",
      "type": "string"
    },
    {
      "name": "brandName",
      "type": "string"
    },
    {
      "name": "titles",
      "type": "array-of-strings"
    },
    {
      "name": "tagline",
      "type": "string"
    },
    {
      "name": "availability",
      "type": "string"
    },
    {
      "name": "degree",
      "type": "string"
    },
    {
      "name": "cgpa",
      "type": "number"
    },
    {
      "name": "location",
      "type": "string"
    },
    {
      "name": "email",
      "type": "string"
    },
    {
      "name": "phone",
      "type": "string"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "personalDetails": [
    {
      "name": "fullNameBangla",
      "type": "string"
    },
    {
      "name": "dateOfBirth",
      "type": "string"
    },
    {
      "name": "placeOfBirth",
      "type": "string"
    },
    {
      "name": "critical_credential",
      "type": "array-of-objects",
      "subFields": [
        {
          "name": "birthRegistrationNumber",
          "type": "string"
        },
        {
          "name": "nationalId",
          "type": "string"
        },
        {
          "name": "passportNumber",
          "type": "string"
        },
        {
          "name": "visibility",
          "type": "string"
        }
      ]
    },
    {
      "name": "nationality",
      "type": "string"
    },
    {
      "name": "religion",
      "type": "string"
    },
    {
      "name": "bloodGroup",
      "type": "string"
    },
    {
      "name": "maritalStatus",
      "type": "string"
    },
    {
      "name": "homeDistrict",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "addresses": [
    {
      "name": "type",
      "type": "enum",
      "options": [
        "present",
        "permanent",
        "mailing"
      ]
    },
    {
      "name": "address",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "family": [
    {
      "name": "relation",
      "type": "string"
    },
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "occupation",
      "type": "string"
    },
    {
      "name": "age",
      "type": "number"
    },
    {
      "name": "phone",
      "type": "string"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "private"
      ]
    }
  ],
  "headlineStats": [
    {
      "name": "problemsSolved",
      "type": "number"
    },
    {
      "name": "contests",
      "type": "number"
    },
    {
      "name": "ieeePapers",
      "type": "number"
    },
    {
      "name": "cgpa",
      "type": "number"
    },
    {
      "name": "codeforcesRating",
      "type": "number"
    },
    {
      "name": "beecrowdRankPercentile",
      "type": "number"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "education": [
    {
      "name": "exam",
      "type": "string"
    },
    {
      "name": "degree",
      "type": "string"
    },
    {
      "name": "major",
      "type": "string"
    },
    {
      "name": "institution",
      "type": "string"
    },
    {
      "name": "board",
      "type": "string"
    },
    {
      "name": "location",
      "type": "string"
    },
    {
      "name": "passingYear",
      "type": "number"
    },
    {
      "name": "result",
      "type": "string"
    },
    {
      "name": "honours",
      "type": "string"
    },
    {
      "name": "achievements",
      "type": "array-of-strings"
    },
    {
      "name": "registrationNumber",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "skills": [
    {
      "name": "category",
      "type": "string"
    },
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "proficiency",
      "type": "number"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "experience": [
    {
      "name": "role",
      "type": "string"
    },
    {
      "name": "position",
      "type": "string"
    },
    {
      "name": "organization",
      "type": "string"
    },
    {
      "name": "industry",
      "type": "string"
    },
    {
      "name": "location",
      "type": "string"
    },
    {
      "name": "website",
      "type": "string"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "startDate",
      "type": "string"
    },
    {
      "name": "endDate",
      "type": "string"
    },
    {
      "name": "current",
      "type": "boolean"
    },
    {
      "name": "responsibilities",
      "type": "array-of-strings"
    },
    {
      "name": "notes",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "employmentCompensation": [
    {
      "name": "organization",
      "type": "string"
    },
    {
      "name": "role",
      "type": "string"
    },
    {
      "name": "grossSalary",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "private"
      ]
    }
  ],
  "training": [
    {
      "name": "domain",
      "type": "string"
    },
    {
      "name": "provider",
      "type": "string"
    },
    {
      "name": "startDate",
      "type": "string"
    },
    {
      "name": "endDate",
      "type": "string"
    },
    {
      "name": "current",
      "type": "boolean"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "projects": [
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "category",
      "type": "string"
    },
    {
      "name": "status",
      "type": "enum",
      "options": [
        "live-in-progress",
        "live",
        "ieee-published"
      ]
    },
    {
      "name": "role",
      "type": "string"
    },
    {
      "name": "duration",
      "type": "string"
    },
    {
      "name": "techStack",
      "type": "array-of-strings"
    },
    {
      "name": "summary",
      "type": "string"
    },
    {
      "name": "detailedDescription",
      "type": "string"
    },
    {
      "name": "architecture",
      "type": "string"
    },
    {
      "name": "features",
      "type": "array-of-strings"
    },
    {
      "name": "challenges",
      "type": "array-of-strings"
    },
    {
      "name": "learnings",
      "type": "array-of-strings"
    },
    {
      "name": "live_link",
      "type": "string"
    },
    {
      "name": "repo_link",
      "type": "string"
    },
    {
      "name": "demoVideo",
      "type": "string"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "gallery",
      "type": "array-of-strings"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "publications": [
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "authorRole",
      "type": "string"
    },
    {
      "name": "authors",
      "type": "array-of-strings"
    },
    {
      "name": "venue",
      "type": "string"
    },
    {
      "name": "year",
      "type": "number"
    },
    {
      "name": "doi",
      "type": "string"
    },
    {
      "name": "summary",
      "type": "string"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "researchProfiles": [
    {
      "name": "platform",
      "type": "string"
    },
    {
      "name": "identifier",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "onlineProfiles": [
    {
      "name": "platform",
      "type": "string"
    },
    {
      "name": "handle",
      "type": "string"
    },
    {
      "name": "url",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "competitiveAchievements": [
    {
      "name": "competitionOrPlatform",
      "type": "string"
    },
    {
      "name": "result",
      "type": "string"
    },
    {
      "name": "context",
      "type": "string"
    },
    {
      "name": "proven_link",
      "type": "string"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "honoursAndAwards": [
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "notes",
      "type": "string"
    },
    {
      "name": "proven_links",
      "type": "string"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "leadershipRoles": [
    {
      "name": "role",
      "type": "string"
    },
    {
      "name": "organization",
      "type": "string"
    },
    {
      "name": "category",
      "type": "string"
    },
    {
      "name": "institution",
      "type": "string"
    },
    {
      "name": "location",
      "type": "string"
    },
    {
      "name": "startDate",
      "type": "string"
    },
    {
      "name": "endDate",
      "type": "string"
    },
    {
      "name": "current",
      "type": "boolean"
    },
    {
      "name": "responsibilities",
      "type": "array-of-strings"
    },
    {
      "name": "achievements",
      "type": "array-of-strings"
    },
    {
      "name": "notes",
      "type": "string"
    },
    {
      "name": "link",
      "type": "string"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "committeeParticipation": [
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "link",
      "type": "string"
    },
    {
      "name": "image",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "languages": [
    {
      "name": "language",
      "type": "string"
    },
    {
      "name": "proficiency",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "contact": [
    {
      "name": "type",
      "type": "enum",
      "options": [
        "email",
        "phone",
        "location"
      ]
    },
    {
      "name": "value",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public",
        "private"
      ]
    }
  ],
  "academicReferences": [
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "designation",
      "type": "string"
    },
    {
      "name": "phone",
      "type": "string"
    },
    {
      "name": "email",
      "type": "string"
    },
    {
      "name": "priority",
      "type": "number"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "private"
      ]
    }
  ],
  "applications": [
    {
      "name": "institution",
      "type": "string"
    },
    {
      "name": "postAppliedFor",
      "type": "string"
    },
    {
      "name": "jobCircularRef",
      "type": "string"
    },
    {
      "name": "circularDate",
      "type": "string"
    },
    {
      "name": "declarationDate",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "private"
      ]
    }
  ],
  "images": [
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "category",
      "type": "string"
    },
    {
      "name": "url",
      "type": "string"
    },
    {
      "name": "source",
      "type": "enum",
      "options": []
    },
    {
      "name": "publicId",
      "type": "string"
    },
    {
      "name": "resourceType",
      "type": "enum",
      "options": [
        "image"
      ]
    },
    {
      "name": "folder",
      "type": "string"
    },
    {
      "name": "altText",
      "type": "string"
    },
    {
      "name": "relatedTo",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "documents": [
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "type",
      "type": "enum",
      "options": [
        "transcript",
        "certificate",
        "id_document",
        "cv",
        "application_form",
        "resume",
        "publication"
      ]
    },
    {
      "name": "url",
      "type": "string"
    },
    {
      "name": "source",
      "type": "enum",
      "options": [
        "imgbb",
        "cloudinary",
        "external"
      ]
    },
    {
      "name": "publicId",
      "type": "string"
    },
    {
      "name": "resourceType",
      "type": "enum",
      "options": [
        "raw"
      ]
    },
    {
      "name": "folder",
      "type": "string"
    },
    {
      "name": "accessMode",
      "type": "enum",
      "options": [
        "public",
        "authenticated"
      ]
    },
    {
      "name": "issuedBy",
      "type": "string"
    },
    {
      "name": "issuedDate",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "private",
        "public"
      ]
    }
  ],
  "siteMeta": [
    {
      "name": "copyright",
      "type": "string"
    },
    {
      "name": "builtWith",
      "type": "string"
    },
    {
      "name": "deployedOn",
      "type": "string"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public"
      ]
    }
  ],
  "__posts": [
    {
      "name": "title",
      "type": "string"
    },
    {
      "name": "description",
      "type": "string"
    },
    {
      "name": "location",
      "type": "string"
    },
    {
      "name": "feeling",
      "type": "enum",
      "options": [
        "😊 Happy",
        "😔 Sad",
        "🤔 Thoughtful",
        "🚀 Excited",
        "💻 Coding",
        "📚 Learning",
        "😴 Tired",
        "😎 Cool",
        "🌟 Inspired",
        "🎉 Celebrating",
        "💪 Motivated",
        "☕ Caffeinated"
      ]
    },
    {
      "name": "attachmentImages",
      "type": "array-of-strings"
    },
    {
      "name": "visibility",
      "type": "enum",
      "options": [
        "public",
        "private"
      ]
    }
  ]
};