import React from 'react';
import { Card, CardProps } from 'react-bootstrap';
import './styles.scss';

interface ICard extends CardProps {
  renderHeader?: React.ReactNode;
  renderBody?: React.ReactNode;
  renderFooter?: React.ReactNode;
  renderCategorie?: React.ReactNode;
  cy: string;
}

const CardComponent = ({
  renderHeader,
  renderBody,
  renderFooter,
  renderCategorie,
  cy,
  ...props
}: ICard): React.ReactElement => (
  <Card className="card-component" {...props} data-cy={cy}>
    <Card.Header className="card-component__header mt-2">{renderHeader}</Card.Header>
    <Card.Body className="card-component__body">
      {renderBody}{' '}
      <Card.Footer className="card-component__footer">
        {renderFooter} on category {renderCategorie}
      </Card.Footer>
    </Card.Body>
  </Card>
);

CardComponent.defaultProps = { renderHeader: '', renderBody: '' };

export default CardComponent;
