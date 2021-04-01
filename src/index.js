import { render } from "react-dom";
import "./index.css";
import * as React from "react";
import {
  TimelineViews,
  TimelineMonth,
  Agenda,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop
} from "@syncfusion/ej2-react-schedule";

import { extend } from "@syncfusion/ej2-base";
import { SampleBase } from "./sample-base";
import * as dataSource from "./datasource.json";
/**
 * schedule timeline resource grouping sample
 */
export class TimelineGrouping extends SampleBase {
  constructor() {
    super(...arguments);
    this.data = extend([], dataSource.resourceData, null, true);
    this.categoryData = [
      { text: "รถกระบะ1", id: 1, color: "#df5286" },
      { text: "ถกระบะ2", id: 2, color: "#7fa900" },
      { text: "ห้องประชุม 1", id: 3, color: "#ea7a57" },
      { text: "ห้องประชุม 2", id: 4, color: "#5978ee" },
      { text: "ห้องประชุม 3", id: 5, color: "#df5286" },
      { text: "ห้องประชุม 4", id: 6, color: "#00bdae" }
    ];
  }
  onActionBegin(args) {
    if (args.requestType === "eventCreate" && args.data.length > 0) {
      let eventData = args.data[0];
      let eventField = this.scheduleObj.eventFields;
      let startDate = eventData[eventField.startTime];
      let endDate = eventData[eventField.endTime];
      args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);
    }
  }
  render() {
    return (
      <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              ref={schedule => (this.scheduleObj = schedule)}
              cssClass="timeline-resource-grouping"
              width="100%"
              height="650px"
              selectedDate={new Date()}
              currentView="TimelineWeek"
              actionBegin={this.onActionBegin.bind(this)}
              eventSettings={{
                dataSource: this.data
              }}
              group={{ resources: ["Categories"] }}
            >
              <ResourcesDirective>
                <ResourceDirective
                  field="TaskId"
                  title="Category"
                  name="Categories"
                  allowMultiple={true}
                  dataSource={this.categoryData}
                  textField="text"
                  idField="id"
                  groupIDField="groupId"
                  colorField="color"
                />
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option="TimelineDay" />
                <ViewDirective option="TimelineWeek" />
                <ViewDirective option="TimelineWorkWeek" />
                <ViewDirective option="TimelineMonth" />
                <ViewDirective option="Agenda" />
              </ViewsDirective>
              <Inject
                services={[
                  TimelineViews,
                  TimelineMonth,
                  Agenda,
                  Resize,
                  DragAndDrop
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }
}

render(<TimelineGrouping />, document.getElementById("sample"));
