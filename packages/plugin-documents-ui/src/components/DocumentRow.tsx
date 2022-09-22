import { conversationDetail } from '@erxes/ui-inbox/src/inbox/graphql/queries';
import { FormControl } from '@erxes/ui/src/components/form';
import React from 'react';

import { IDocument } from '../../src/types';

type Props = {
  document: IDocument;
  history: any;
  isChecked: boolean;
  toggleBulk: (document: IDocument, isChecked?: boolean) => void;
};

class Row extends React.Component<Props> {
  render() {
    const { document, history, toggleBulk, isChecked } = this.props;

    const onChange = e => {
      if (toggleBulk) {
        toggleBulk(document, e.target.checked);
      }
    };

    const onClick = e => {
      e.stopPropagation();
    };

    const onTrClick = () => {
      history.push(`/document/details/${document._id}`);
    };

    const { name, attachments, description, createdAt } = document;

    return (
      <tr onClick={onTrClick}>
        <td onClick={onClick}>
          <FormControl
            checked={isChecked}
            componentClass="checkbox"
            onChange={onChange}
          />
        </td>
        <td>{name}</td>
        <td>{attachments[0].name}</td>
        <td>{attachments[0].type}</td>
        <td>{description}</td>
        <td>{createdAt}</td>
      </tr>
    );
  }
}

export default Row;
