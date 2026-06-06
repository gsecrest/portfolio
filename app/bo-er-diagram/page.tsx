"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const DIAGRAM = `
erDiagram

    frs_def_workflow_type {
        char        RecId           PK
        nvarchar    Name
        nvarchar    ObjectType
        nvarchar    Description
        nvarchar    DisplayName
        varchar     Category
        bit         IsInternal
        bit         IsHighPriority
    }

    frs_def_workflow_definition {
        char        RecId                   PK
        char        WorkflowTypeLink_RecID  FK
        varchar     DefVersion
        ntext       Details
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

    ChangeStatusWorkFlow {
        char        RecId               PK
        nvarchar    CurrentStatus
        nvarchar    NextStatus
        smallint    SortOrder
        varchar     CurrentStatus_Valid  FK
        varchar     NextStatus_Valid     FK
    }

    ProblemStatusWorkflow {
        char        RecId               PK
        nvarchar    CurrentStatus
        nvarchar    NextStatus
        smallint    SortOrder
        varchar     CurrentStatus_Valid  FK
        varchar     NextStatus_Valid     FK
    }

    HRCaseStatusWorkflow {
        char        RecId               PK
        nvarchar    CurrentStatus
        nvarchar    NextStatus
        smallint    SortOrder
        varchar     CurrentStatus_Valid  FK
        varchar     NextStatus_Valid     FK
    }

    nrn_DemandStatus_Workflow {
        char        RecId               PK
        nvarchar    CurrentStatus
        nvarchar    NextStatus
        smallint    SortOrder
        varchar     CurrentStatus_Valid  FK
        varchar     NextStatus_Valid     FK
    }

    frs_def_workflow_type           ||--o{    frs_def_workflow_definition     : "has versions"
    frs_def_workflow_definition     }o--o{    frs_def_quick_actions           : "XML block QAID ref"
    frs_def_workflow_definition     }o--o{    ContactGroup                    : "XML approvers ref"
    ChangeStatusWorkFlow            }o--o|    frs_def_workflow_type           : "ObjectType = Change"
    ProblemStatusWorkflow           }o--o|    frs_def_workflow_type           : "ObjectType = Problem"
    HRCaseStatusWorkflow            }o--o|    frs_def_workflow_type           : "ObjectType = ivnt_HRCase"
    nrn_DemandStatus_Workflow       }o--o|    frs_def_workflow_type           : "ObjectType = nrn_Demand"
`;

const tables = [
  {
    name: "frs_def_workflow_type",
    role: "Workflow Type Definition",
    description:
      "Defines every workflow in the system. The ObjectType column identifies which business object (Incident, Change, Problem, CI, Employee, etc.) the workflow belongs to. Each row is one named workflow type.",
    key: "RecId ← frs_def_workflow_definition.WorkflowTypeLink_RecID",
  },
  {
    name: "frs_def_workflow_definition",
    role: "Versioned Workflow XML",
    description:
      "Each row is one version of a workflow. The Details column contains the full workflow as XML — every block, its type, title, and team/approval references. Multiple versions exist per workflow type; the app always queries the latest using ROW_NUMBER() ordered by DefVersion DESC.",
    key: "WorkflowTypeLink_RecID → frs_def_workflow_type | Details XML → frs_def_quick_actions, ContactGroup",
  },
  {
    name: "frs_def_quick_actions",
    role: "QuickAction Definitions",
    description:
      "Reusable action blocks referenced from workflow XML by QAID (a GUID). The Definition column is JSON containing the OwnerTeam used to determine team assignment for update, quickaction, and advancedtask blocks.",
    key: "Id ← workflow XML block QAID reference",
  },
  {
    name: "ContactGroup",
    role: "Teams and Approval Groups",
    description:
      "Used for approval workflow blocks (vote, vote0007). Filtered to GroupType = 'Service Request Approval' and Status = 'Active' to resolve approval group GUIDs from block XML to readable team names.",
    key: "RecId ← workflow XML approvers block reference",
  },
  {
    name: "ChangeStatusWorkFlow",
    role: "Change Status Transitions",
    description:
      "Defines allowed status transitions for Change records (e.g. Logged → Requested → Pending Approval → Scheduled → Implemented → Closed). Each row is one valid CurrentStatus → NextStatus move.",
    key: "Linked via ObjectType = 'Change' convention in frs_def_workflow_type",
  },
  {
    name: "ProblemStatusWorkflow",
    role: "Problem Status Transitions",
    description:
      "Same structure as ChangeStatusWorkFlow but for Problem records. Defines the allowed status progression for Problem management.",
    key: "Linked via ObjectType = 'Problem' convention",
  },
  {
    name: "HRCaseStatusWorkflow",
    role: "HR Case Status Transitions",
    description:
      "Same structure as ChangeStatusWorkFlow but for HR Case records (ObjectType = 'ivnt_HRCase').",
    key: "Linked via ObjectType = 'ivnt_HRCase' convention",
  },
  {
    name: "nrn_DemandStatus_Workflow",
    role: "Demand Status Transitions",
    description:
      "Same structure as ChangeStatusWorkFlow but for Demand records (ObjectType = 'nrn_Demand'). Part of the PPM / Demand Management module.",
    key: "Linked via ObjectType = 'nrn_Demand' convention",
  },
];

const objectTypes = [
  { type: "Incident",               object: "Incident Management" },
  { type: "Change",                 object: "Change Management" },
  { type: "Problem",                object: "Problem Management" },
  { type: "CI",                     object: "Configuration Item" },
  { type: "CI.Computer",            object: "Computer CI" },
  { type: "CI.MobileDevice",        object: "Mobile Device CI" },
  { type: "Employee",               object: "Employee Records" },
  { type: "ivnt_SecurityIncident",  object: "Security Incident" },
  { type: "ivnt_HRCase",            object: "HR Case" },
  { type: "ivnt_WorkOrder",         object: "Work Order" },
  { type: "ivnt_GRCAudit",          object: "GRC Audit" },
  { type: "GRC_Policy",             object: "GRC Policy" },
  { type: "GRC_Exception",          object: "GRC Exception" },
  { type: "FRS_Knowledge.*",        object: "Knowledge Management" },
  { type: "ReleaseMilestone",       object: "Release Milestone" },
  { type: "ReleaseProject",         object: "Release Project" },
  { type: "Frs_Project",            object: "Project Management" },
  { type: "nrn_Demand",             object: "Demand Management" },
  { type: "ScheduleEntry",          object: "Scheduled / Automated" },
  { type: "Task.*",                 object: "Task Workflows" },
];

export default function BoErDiagramPage() {
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
          <span className="text-sm font-medium text-gray-900">ER Diagram — Business Object Workflows</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900">BO Workflow ER Diagram</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl">
            How Ivanti ISM tables are structured for Business Object workflows — Incident, Change, Problem,
            Knowledge, GRC, and more.
          </p>
        </div>

        {/* Diagram */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12 overflow-x-auto">
          <div ref={ref} className="mermaid min-w-[700px]" />
        </div>

        {/* ObjectType reference */}
        <div className="mb-12">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            ObjectType Reference
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            The <span className="font-mono text-gray-700">ObjectType</span> column in{" "}
            <span className="font-mono text-gray-700">frs_def_workflow_type</span> identifies which
            business object each workflow belongs to. There are 86 distinct values — key ones shown below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {objectTypes.map((o) => (
              <div key={o.type} className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2">
                <span className="font-mono text-xs text-gray-700 shrink-0">{o.type}</span>
                <span className="text-xs text-gray-400 truncate">{o.object}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table descriptions */}
        <div className="space-y-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Table Descriptions
          </h2>
          {tables.map((t) => (
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
