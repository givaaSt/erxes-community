import FormControl from '@erxes/ui/src/components/form/Control';
import FormGroup from '@erxes/ui/src/components/form/Group';
import ControlLabel from '@erxes/ui/src/components/form/Label';
import { IButtonMutateProps, IFormProps } from '@erxes/ui/src/types';
import React from 'react';
import { Form } from '@erxes/ui/src/components/form';
import Uploader from '@erxes/ui/src/components/Uploader';
import { IDocument, IDocumentDoc } from '../types';
import { ModalFooter } from '@erxes/ui/src/styles/main';
import Button from '@erxes/ui/src/components/Button';
import { extractAttachment } from '@erxes/ui/src/utils';

type Props = {
  queryParams: any;
  history: any;
  document: IDocument;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  closeModal: () => void;
};

type State = {
  attachments: any;
};
class DocumentForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { document = {} } = props;
    this.state = {
      attachments: document.attachments || undefined
    };
  }

  generateDoc = (values: { _id: string } & IDocumentDoc) => {
    const { document } = this.props;

    const finalValues = values;

    if (document) {
      finalValues._id = document._id;
    }

    return {
      _id: finalValues._id,
      ...this.state,
      name: finalValues.name,
      description: finalValues.description,
      attachments: (this.state.attachments || []).map(a => ({
        name: a.name,
        url: a.url,
        type: a.type,
        size: a.size
      }))
    };
  };

  onChangeAttachments = (key: any, files: any[]) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: files ? files : undefined
    }));
  };

  renderContent = (formProps: IFormProps) => {
    const document = this.props.document || ({} as IDocument);

    const { renderButton, closeModal } = this.props;
    const { values, isSubmitted } = formProps;

    const attachments =
      (document.attachments && extractAttachment(document.attachments)) || [];

    return (
      <>
        <FormGroup>
          <ControlLabel required={true}>Name</ControlLabel>
          <FormControl
            {...formProps}
            name="name"
            defaultValue={document.name}
            type="text"
            required={true}
            autoFocus={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Attach a file</ControlLabel>
          <Uploader
            defaultFileList={attachments}
            multiple={true}
            single={false}
            limit={6}
            onChange={e => this.onChangeAttachments('attachments', e)}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            {...formProps}
            name="description"
            defaultValue={document.description}
            componentClass="textarea"
          />
        </FormGroup>

        <ModalFooter>
          <Button btnStyle="simple" onClick={closeModal} icon="cancel-1">
            Close
          </Button>

          {renderButton({
            name: 'document',
            values: this.generateDoc(values),
            isSubmitted,
            object: this.props.document
          })}
        </ModalFooter>
      </>
    );
  };

  render() {
    return <Form renderContent={this.renderContent} />;
  }
}

export default DocumentForm;
