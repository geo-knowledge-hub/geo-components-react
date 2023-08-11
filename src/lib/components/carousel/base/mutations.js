/*
 * This file is part of GEO-Components-React.
 * Copyright (C) 2022-2023 GEO Secretariat.
 *
 * GEO-Components-React is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

export const mutateVocabularyData = (data, url) => ({
  id: data.id,
  title: data.title.en, // FIXME
  image: url === '#' ? data.props.icon : `/static/${data.props.icon}`, // Specific of the vocabulary data
  url: `${url}:${data.id}`,
  subElements: [],
  hasSubElements: data.props.has_subtype === 'true',
});
