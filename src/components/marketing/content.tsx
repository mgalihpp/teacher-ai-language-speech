function Content({
  sections,
}: {
  sections: { title: string; content: string }[];
}) {
  return (
    <div className="mx-auto mt-20 flex w-full max-w-2xl flex-col space-y-8 max-sm:px-4">
      {sections.map((section, index) => (
        <div key={index}>
          <h1 className="mb-6 text-3xl font-bold text-primary">
            {section.title}
          </h1>
          <p
            className="dark:text-stone-200 "
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </div>
      ))}
    </div>
  );
}

export default Content;
