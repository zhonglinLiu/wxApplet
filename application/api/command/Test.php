<?php 
namespace app\api\command;
use think\Console\Command;
use think\Console\Input;
use think\Console\Output;

class Test extends Command{
	protected function configure()
    {
        $this->setName('test')->setDescription('Here is the remark ');
    }

    protected function execute(Input $input, Output $output)
    {
        $output->writeln("TestCommand:");
    }
}