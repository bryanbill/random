import 'package:flutter/material.dart';
import 'package:journaly/core/extensions/date_time.dart';
import 'package:journaly/core/model/journal.dart';
import 'package:journaly/core/repository/journals.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:skeletonizer/skeletonizer.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      journals = await journalRepository.fetchJournals();

      setState(() {
        loading = false;
      });
    });
  }

  final journalRepository = JournalRepository();
  final pageController = PageController();

  int currentIndex = 0;
  List<Journal> journals = [];

  bool loading = true;
  bool isCreating = false;

  final titleController = TextEditingController();
  final contentController = TextEditingController();

  Future<void> createJournal() async {
    if (titleController.text.isEmpty || contentController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Title and content cannot be empty"),
          padding: EdgeInsets.all(8),
          behavior: SnackBarBehavior.floating,
        ),
      );

      return;
    }
    setState(() {
      isCreating = true;
    });

    final res = await journalRepository.addJournal(
      titleController.text,
      contentController.text,
    );

    if (!res && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Something went wrong, try again later"),
          padding: EdgeInsets.all(8),
          behavior: SnackBarBehavior.floating,
        ),
      );

      setState(() {
        isCreating = false;
      });

      return;
    }

    journals = await journalRepository.fetchJournals();

    setState(() {
      isCreating = false;
      titleController.clear();
      contentController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Journaly'),
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: RefreshIndicator(
          onRefresh: () async {
            journals = await journalRepository.fetchJournals();
            setState(() {});
          },
          child: PageView(
            controller: pageController,
            physics: const NeverScrollableScrollPhysics(),
            children: [
              buildJournalList(),
              buildComposer(),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        onTap: (index) {
          pageController.animateToPage(
            index,
            duration: const Duration(milliseconds: 300),
            curve: Curves.ease,
          );

          setState(() {
            currentIndex = index;
          });
        },
        currentIndex: currentIndex,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.bookmark_outline),
            label: 'Journals',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.create_outlined),
            label: 'Write',
          ),
        ],
      ),
    );
  }

  Widget buildJournalList() {
    return loading
        ? Skeletonizer(
            enabled: loading,
            child: ListView.builder(
              itemCount: 10,
              itemBuilder: (context, index) {
                return Container(
                  constraints: const BoxConstraints(
                    minHeight: 100,
                    maxHeight: 120,
                  ),
                  margin: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        width: MediaQuery.of(context).size.width * 0.7,
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("lorem ipsum"),
                            Text(
                              """lorem ipsum dolor sit amet, 
                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                                labore et dolore magna aliqua. Ut enim ad minim veniam,
                                 quis nostrud exercitation ullamco laboris nisi ut 
                                 aliquip ex ea commodo consequat. Duis aute irure 
                                 dolor in reprehenderit in voluptate velit esse ci
                                 
                                 llum dolore eu fugiat nulla pariatur.
                                  Excepteur sint occaecat cupidatat non proident, 
                                 sunt in culpa qui officia deserunt 
                                 mollit anim id est laborum.""",
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                      const Spacer(),
                      const Icon(
                        Icons.remove_red_eye_outlined,
                      )
                    ],
                  ),
                );
              },
            ),
          )
        : journals.isEmpty
            ? const Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.bookmark_outline,
                      size: 48,
                    ),
                    SizedBox(height: 20),
                    Text('No journals found'),
                  ],
                ),
              )
            : ListView.separated(
                separatorBuilder: (context, index) => const Divider(),
                itemCount: journals.length,
                itemBuilder: (context, index) {
                  return Container(
                    margin: EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.surface,
                      border: Border.all(
                        color: Theme.of(context)
                            .colorScheme
                            .primary
                            .withOpacity(.5),
                      ),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              journals[index].title,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                                color: Colors.black,
                              ),
                            ),
                            const Spacer(),
                            Text(
                              journals[index].createdAt.timeAgo,
                              style: TextStyle(
                                color: Theme.of(context).colorScheme.primary,
                              ),
                            ),
                          ],
                        ),
                        Text(
                          journals[index].content,
                          style: TextStyle(
                            letterSpacing: 1.2,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              );
  }

  Widget buildComposer() {
    return SingleChildScrollView(
      child: SizedBox(
        height: MediaQuery.of(context).size.height,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            const Text('What\'s on your mind?'),
            const SizedBox(height: 20),
            TextField(
              controller: titleController,
              decoration: const InputDecoration(
                  hintText: "lorem ipsum",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(10),
                    ),
                  )),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: contentController,
              maxLines: 10,
              maxLength: 500,
              decoration: const InputDecoration(
                  hintText:
                      "lorem ipsum dolor sit amet, consectetur adipiscing elit",
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                    Radius.circular(10),
                  ))),
            ),
            const SizedBox(
              height: 20,
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: isCreating
                  ? LoadingAnimationWidget.halfTriangleDot(
                      color: Theme.of(context).colorScheme.primary,
                      size: 32,
                    )
                  : ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.all(12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      onPressed: createJournal,
                      child: const Text('Save'),
                    ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
