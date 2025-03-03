import { chakra, Icon, Tooltip, Hide, Skeleton, Flex } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import type { CsvExportParams } from 'types/client/address';

import appConfig from 'configs/app/config';
import svgFileIcon from 'icons/files/csv.svg';
import useIsInitialLoading from 'lib/hooks/useIsInitialLoading';
import useIsMobile from 'lib/hooks/useIsMobile';
import LinkInternal from 'ui/shared/LinkInternal';

interface Props {
  address: string;
  params: CsvExportParams;
  className?: string;
  isLoading?: boolean;
}

const AddressCsvExportLink = ({ className, address, params, isLoading }: Props) => {
  const isMobile = useIsMobile();
  const isInitialLoading = useIsInitialLoading(isLoading);

  if (!appConfig.reCaptcha.siteKey) {
    return null;
  }

  if (isInitialLoading) {
    return (
      <Flex className={ className } flexShrink={ 0 } alignItems="center">
        <Skeleton boxSize={{ base: '32px', lg: 6 }} borderRadius="base"/>
        <Hide ssr={ false } below="lg">
          <Skeleton w="112px" h={ 6 } ml={ 1 }/>
        </Hide>
      </Flex>
    );
  }

  return (
    <Tooltip isDisabled={ !isMobile } label="Download CSV">
      <LinkInternal
        className={ className }
        display="inline-flex"
        alignItems="center"
        whiteSpace="nowrap"
        href={ route({ pathname: '/csv-export', query: { ...params, address } }) }
        flexShrink={ 0 }
      >
        <Icon as={ svgFileIcon } boxSize={{ base: '30px', lg: 6 }}/>
        <Hide ssr={ false } below="lg"><chakra.span ml={ 1 }>Download CSV</chakra.span></Hide>
      </LinkInternal>
    </Tooltip>
  );
};

export default React.memo(chakra(AddressCsvExportLink));
