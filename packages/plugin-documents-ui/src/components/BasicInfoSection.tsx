import {
  __,
  Alert,
  Button,
  confirm,
  DropdownToggle,
  Icon,
  MainStyleInfoWrapper as InfoWrapper,
  ModalTrigger,
  Sidebar
} from '@erxes/ui/src';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DocumentForm from '../containers/DocumentForm';

import { Action, Name } from '../styles';
import { IDocument } from '../types';
import DetailInfo from './DetailInfo';

type Props = {
  document: IDocument;
  remove: () => void;
};

class BasicInfoSection extends React.Component<Props> {
  renderAction() {
    const { remove } = this.props;

    const onDelete = () =>
      confirm()
        .then(() => remove())
        .catch(error => {
          Alert.error(error.message);
        });

    return (
      <Action>
        <Dropdown>
          <Dropdown.Toggle as={DropdownToggle} id="dropdown-info">
            <Button btnStyle="simple" size="medium">
              {__('Action')}
              <Icon icon="angle-down" />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <li>
              <a href="#delete" onClick={onDelete}>
                {__('Delete')}
              </a>
            </li>
          </Dropdown.Menu>
        </Dropdown>
      </Action>
    );
  }

  render() {
    const { Section } = Sidebar;
    const { document } = this.props;

    const content = props => <DocumentForm {...props} document={document} />;

    return (
      <Sidebar.Section>
        <InfoWrapper>
          <Name>{document.name}</Name>
          <ModalTrigger
            title="Edit basic info"
            trigger={<Icon icon="edit" />}
            size="xl"
            content={content}
          />
        </InfoWrapper>

        {this.renderAction()}

        <Section>
          <DetailInfo document={document} />
        </Section>
      </Sidebar.Section>
    );
  }
}

export default BasicInfoSection;
