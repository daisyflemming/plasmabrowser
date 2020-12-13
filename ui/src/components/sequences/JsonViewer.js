import React, {Component} from 'react';
import {connect} from 'react-redux';
import {create_UUID} from "../utils/commons";

class JsonViewer extends Component {
    render() {
      let {expressionCounts, expressionAnnotations} = this.props;
      return(
        <div className={'json-content'}>
          [<br/>
          &ensp;"counts": [<br/>
          {
            expressionCounts.map(s => {
              return (
                <div key={'count_' + create_UUID()}>
                  &emsp;{"{"}<br/>
                  &ensp;&emsp;"count": {s.count},<br/>
                  &ensp;&emsp;"name": "{s.name}",<br/>
                  &ensp;&emsp;"range": {"["} {s.range.map(x =>
                    <span key={'range_' + create_UUID()}>
                  {"{"} "start": {x.start}, "end": {x.end} {"}"}
                </span>
                )}{"]"}<br/>
                  &emsp;{"}"},<br/>
                </div>
              )
            })
          }
          &ensp;],<br/>

          &ensp;"annotations": [<br/>&emsp;[<br/>
          {
            expressionAnnotations[0].map(a => {
              return (
                <div key={'annotation_' + create_UUID()}>
                  &ensp;&emsp;{"{"}<br/>
                  &emsp;&emsp;"Gene": {a['Gene']},<br/>
                  &emsp;&emsp;"range": {a.range.map(y =>
                    <span key={'range_' + create_UUID()}>
                      {"{"} "start": {y.start}, "end": {y.end} {"}"}
                    </span>
                )}<br/>
                  &ensp;&emsp;{"}"},<br/>
                </div>
              )
            })
          }

          &emsp;]<br/>
          &ensp;]<br/>
          }<br/>
        </div>
        );
    }
};


const mapStateToProps = (state, ownProps) => {
  return {
    expressionCounts: state.rootReducer.expressionCounts,
    expressionAnnotations: state.rootReducer.expressionAnnotations,
  }
};

export default connect(mapStateToProps)(JsonViewer);

