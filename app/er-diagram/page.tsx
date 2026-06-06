"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const DIAGRAM = `
erDiagram

    ServiceReqTemplate {
        char        RecId                                   PK
        nvarchar    Name
        nvarchar    Status
        ntext       LayoutDefinition
        bit         IsFormOffering
        nvarchar    DefaultAssigneeTeam
        varchar     ServiceReqTemplateDefinitionLink_RecID  FK
    }

    ServiceReqTemplateParam {
        char        RecId               PK
        varchar     ParentLink_RecID    FK
        nvarchar    Name
        nvarchar    DisplayName
        varchar     DisplayType
        smallint    SequenceNum
        bit         ReadOnly
        nvarchar    RequiredExpression
        nvarchar    VisibilityExpression
        varchar     ValidationList_RecID    FK
    }

    ServiceReqTemplateParamValid {
        char        RecId               PK
        varchar     ParentLink_RecID    FK
        nvarchar    ParameterValue
        smallint    SortOrder
    }

    ServiceReqTemplateDefinition {
        char        RecId                           PK
        varchar     ServiceReqTemplateLink_RecID    FK
        nvarchar    Definition
        nvarchar    BOMappingDefinition
        nvarchar    ViewDefinition
        smallint    Revision
    }

    FusionLink {
        char        RecId               PK
        varchar     SourceID            FK
        varchar     TargetID            FK
        varchar     RelationshipName
    }

    ServiceReqFulfillmentPlan {
        char        RecId                           PK
        varchar     Name
        varchar     WorkflowId                      FK
        varchar     ServiceReqFulfillmentPlanType
    }

    frs_def_workflow_definition {
        char        RecId                   PK
        char        WorkflowTypeLink_RecID  FK
        varchar     DefVersion
        ntext       Details
    }

    frs_def_workflow_type {
        char        RecId   PK
        nvarchar    Name
    }

    frs_def_quick_actions {
        uniqueidentifier    Id          PK
        ntext               Definition
    }

    ContactGroup {
        char        RecId       PK
        nvarchar    Name
        varchar     GroupType
        varchar     Status
    }

    ServiceReqTemplate          ||--o{    ServiceReqTemplateParam         : "has form fields"
    ServiceReqTemplateParam     ||--o{    ServiceReqTemplateParamValid    : "has valid values"
    ServiceReqTemplate          ||--o|    ServiceReqTemplateDefinition    : "has definition"
    ServiceReqTemplate          ||--o{    FusionLink                      : "source of link"
    FusionLink                  }o--||    ServiceReqFulfillmentPlan       : "target fulfillment plan"
    ServiceReqFulfillmentPlan   }o--o{    frs_def_workflow_definition     : "references workflow"
    frs_def_workflow_definition }o--||    frs_def_workflow_type           : "has type"
    frs_def_workflow_definition }o--o{    frs_def_quick_actions           : "XML block QAID ref"
    frs_def_workflow_definition }o--o{    ContactGroup                    : "XML approvers ref"
`;

export default function ErDiagramPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("mermaid").then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: "neutral",
        er: { diagramPadding: 40, useMaxWidth: true },
      });
      if (ref.current) {
        ref.current.removeAttribute("data-processed");
        ref.current.innerHTML = DIAGRAM;
        m.default.run({ nodes: [ref.current] });
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Back to Portfolio
          </Link>
          <span className="text-gray-200">|</span>
          <span className="text-sm font-medium text-gray-900">ER Diagram — Ivanti RO Tables</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900">Entity Relationship Diagram</h1>
          <p className="text-sm text-gray-500 mt-2">
            How Ivanti ISM tables are linked across the RO Workflow Query and RO Attribute Query projects.
          </p>
        </div>

        {/* Diagram */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12 overflow-x-auto">
          <div
            ref={ref}
            className="mermaid min-w-[700px]"
          />
        </div>

        {/* Table descriptions */}
        <div className="space-y-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Table Descriptions</h2>

          {[
            {
              name: "ServiceReqTemplate",
              role: "The Request Offering (RO)",
              description: "Central table — each row is one request offering visible in the Ivanti Service Catalog. Contains the offering name, status, layout definition, and links to its form fields and fulfillment plan.",
              key: "RecId → ServiceReqTemplateParam, FusionLink, ServiceReqTemplateDefinition",
            },
            {
              name: "ServiceReqTemplateParam",
              role: "Form Fields on the RO",
              description: "Each row is one field on the RO submission form. Defines the field name, display label, type (text, combo, date, etc.), sequence order, and required/visibility expressions.",
              key: "ParentLink_RecID → ServiceReqTemplate.RecId",
            },
            {
              name: "ServiceReqTemplateParamValid",
              role: "Valid Values for Dropdown Fields",
              description: "Each row is one selectable option in a combo (dropdown) field. Used to populate picklists shown to the submitter.",
              key: "ParentLink_RecID → ServiceReqTemplateParam.RecId",
            },
            {
              name: "ServiceReqTemplateDefinition",
              role: "Business Object Mapping",
              description: "Technical definition of how the RO maps to the underlying Ivanti business object. Contains JSON/XML for field mappings and view layout. Linked 1:1 to the RO.",
              key: "ServiceReqTemplateLink_RecID → ServiceReqTemplate.RecId",
            },
            {
              name: "FusionLink",
              role: "Generic Relationship Bridge",
              description: "Ivanti's universal link table connecting any two records via SourceID, TargetID, and a RelationshipName. Used here to connect each RO to its fulfillment plan.",
              key: "SourceID → ServiceReqTemplate | TargetID → ServiceReqFulfillmentPlan",
            },
            {
              name: "ServiceReqFulfillmentPlan",
              role: "Links RO to Its Workflow",
              description: "Defines how an RO is fulfilled. The WorkflowId column references the workflow definition that executes when the RO is submitted.",
              key: "WorkflowId → frs_def_workflow_definition.RecID",
            },
            {
              name: "frs_def_workflow_definition",
              role: "Workflow Definition XML",
              description: "Each row is one version of a workflow. The Details column contains the full workflow as XML — every block, its type, title, properties, and team references. Multiple rows exist per workflow (one per version); apps always use the latest.",
              key: "WorkflowTypeLink_RecID → frs_def_workflow_type | Details XML → frs_def_quick_actions, ContactGroup",
            },
            {
              name: "frs_def_workflow_type",
              role: "Workflow Type Name",
              description: 'Lookup table giving each workflow a human-readable name. RO workflows follow the pattern: "{Offering Name} Request form".',
              key: "RecId ← frs_def_workflow_definition.WorkflowTypeLink_RecID",
            },
            {
              name: "frs_def_quick_actions",
              role: "QuickAction Definitions",
              description: "Reusable action blocks referenced from workflow XML by QAID. The Definition column is JSON and contains the OwnerTeam field used to determine team assignment for update, quickaction, and advancedtask blocks.",
              key: "Id ← workflow XML block QAID reference",
            },
            {
              name: "ContactGroup",
              role: "Teams and Approval Groups",
              description: "Used for approval workflow blocks (vote, vote0007). The app filters to GroupType = 'Service Request Approval' and Status = 'Active' to resolve approval group GUIDs from block XML to readable team names.",
              key: "RecId ← workflow XML approvers block reference",
            },
          ].map((t) => (
            <div key={t.name} className="grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-gray-100 pb-8">
              <div className="md:col-span-1">
                <p className="text-sm font-mono font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-400 mt-1">{t.role}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-sm text-gray-600 leading-relaxed mb-2">{t.description}</p>
                <p className="text-xs font-mono text-gray-400">{t.key}</p>
              </div>
            </div>
          ))}
        </div>

      </main>

      <footer className="border-t border-gray-100 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Glenn Secrest
        </div>
      </footer>
    </div>
  );
}
