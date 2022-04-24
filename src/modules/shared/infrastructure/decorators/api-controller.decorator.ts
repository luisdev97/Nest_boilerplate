import { Controller } from '@nestjs/common';

const addVersion = (version, path) => {
  const thisPath = path || '';
  return version.map((v) => `${v}/${thisPath}`);
};

const getPathsWithVersion = (prefix: string | string[], version: []) => {
  const paths: string[] = [];
  if (Array.isArray(prefix)) {
    prefix.forEach((path) => {
      paths.push(...addVersion(version, path));
    });
  } else {
    paths.push(...addVersion(version, prefix));
  }
  return paths;
};

export function ApiController(prefix?: string | string[]) {
  return (target: any) => {
    const version: [] = Reflect.getMetadata('apiVersion', target);
    if (version) {
      const paths = getPathsWithVersion(prefix, version);
      Controller(paths)(target);
    } else {
      Controller(prefix)(target);
    }
  };
}
