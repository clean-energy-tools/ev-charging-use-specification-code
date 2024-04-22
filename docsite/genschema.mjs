
// const JsonSchemaStaticDocs = require("json-schema-static-docs");

// (async () => {
//   let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
//     inputPath: "../schema",
//     outputPath: "schema-docs",
//     inputFileGlob: '**/*.yaml',
//     createIndex: true,
//     indexPath: 'index.html.md',
//     addFrontMatter: true,
//     ajvOptions: {
//         allowUnionTypes: true,
//         validateFormats: true
//     },
//   });
//   await jsonSchemaStaticDocs.generate();
//   console.log("Documents generated.");
// })();


import { JSONSchemaMarkdown } from "json-schema-md-doc";
import { promises as fsp } from 'node:fs';
import path from 'node:path';

class MyDoccer extends JSONSchemaMarkdown {
  constructor(){
      super();
      this.footer = " _" + (new Date()) + "_";
  }

  // writePath(level, path) {
  //   console.log(`writePath ${level}`, path);
  // }
  // writeId(id, level) {
  //   console.log(`writeId ${level}`, id);
  // }
};

for (const fn of [
  {
    src: 'operating-costs.json',
    dest: 'operating-costs.html.md',
    title: 'Operating Costs Documentation'
  },
  {
    src: 'outage.json',
    dest: 'outage.html.md',
    title: 'Outage Documentation'
  },
  {
    src: 'port.json',
    dest: 'port.html.md',
    title: 'Charging port documentation'
  },
  {
    src: 'project.json',
    dest: 'project.html.md',
    title: 'Project Documentation'
  },
  {
    src: 'session.json',
    dest: 'session.html.md',
    title: 'Session Documentation'
  },
  {
    src: 'station.json',
    dest: 'station.html.md',
    title: 'Station Documentation'
  },
  {
    src: 'uptime.json',
    dest: 'uptime.html.md',
    title: 'Uptime Documentation'
  },
  {
    src: 'common.json',
    dest: 'common.html.md',
    title: 'Common definitions Documentation'
  },
]) {
    const Doccer = new MyDoccer();

    let json = await fsp.readFile(path.join('..', 'node', 'src', 'schemas', fn.src), 'utf-8');

    Doccer.load(json);

    const docmd = `---
title: ${fn.title}
layout: api-page.html.ejs
---
${Doccer.generate()}
`;

    await fsp.writeFile(path.join('documents', 'schemadocs', fn.dest), docmd, 'utf-8');
    // console.log(Doccer.generate());
}


