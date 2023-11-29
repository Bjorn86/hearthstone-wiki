import PropTypes from 'prop-types';
import { memo } from 'react';
import { useGetGameForFavoritesQuery } from 'shared/api';
import { Preloader } from 'widgets/preloader';
import { Card } from 'features/cards/card';

function CardWrapper({ id }) {
  const { data, isLoading } = useGetGameForFavoritesQuery(id);

  if (isLoading) {
    return <Preloader />;
  }

  return data && !isLoading && <Card {...data} />;
}

export default memo(CardWrapper);

CardWrapper.propTypes = {
  id: PropTypes.number.isRequired,
};
