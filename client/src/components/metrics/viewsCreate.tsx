import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { ErrorsField } from '../forms/errorsField';
import { NameField, NameSchema } from '../forms/nameField';

export interface Props {
  onCreate: (form: { name: string }) => void;
  onClose: () => void;
  name: string;
  isLoading: boolean;
  errors: any;
  success: boolean;
}

export interface State {
  name: string;
}

const ValidationSchema = Yup.object().shape({
  name: NameSchema,
});

export default class ViewsCreate extends React.Component<Props, {}> {

  public createSearch = (state: State) => {
    this.props.onCreate({
      name: state.name,
    });
  };

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.success) {
      this.props.onClose();
    }
  }

  public render() {
    const initialValues = {name: this.props.name};
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(fValues: State, fActions: FormikActions<State>) => {
          this.createSearch(fValues);
        }}
        render={(props: FormikProps<State>) => (
          <form className="form-horizontal" onSubmit={props.handleSubmit}>
            {ErrorsField(this.props.errors)}
            {NameField(props, this.props.errors, '10')}
            <div className="form-group form-actions">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={this.props.isLoading}
                >
                  Save view
                </button>
              </div>
            </div>
          </form>
        )}
      />
    );
  }
}
